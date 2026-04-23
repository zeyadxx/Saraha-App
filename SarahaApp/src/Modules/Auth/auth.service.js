import { CLIENT_ID } from "../../../config/config.service.js";
import { dbService, UserModel } from "../../DB/index.js";
import { hashEnum } from "../../Utils/Enums/hash.enum.js";
import { err, succesResponse } from "../../Utils/response/index.js";
import { encrypt } from "../../Utils/security/encryption.js";
import { compareHash, generetHash } from "../../Utils/security/hash.js";
import { getLoginCredientials } from "../../Utils/tokens/token.js";
import { OAuth2Client } from "google-auth-library";
import { LogoutEnum, providerEnum } from "../../Utils/Enums/user.enum.js";
import { generateOTP } from "./../../Utils/generate_otp.js";
import { emailEvent } from "../../Utils/events/email.events.js";
import TokenModel from "../../DB/Models/token.model.js";
//---- SIGNUP-----
export const signup = async (req, res) => {
  // check user exist
  const { email } = req.body;

  const userExist = await dbService.findOne({
    model: UserModel,
    filter: { email },
  });

  if (userExist) {
    throw err.ConflictException({ message: "the user is already exist!!" });
  }

  // hash password before store
  const hashPassword = await generetHash({
    plainText: req.body.password,
    algo: hashEnum.Argon,
  });

  // encryption phone
  const encryptedPhone = await encrypt(req.body.phone);

  const otp = generateOTP();

  const hashOtp = await generetHash({ plainText: otp, algo: hashEnum.Argon });
  // create user in DB
  const user = await dbService.create({
    model: UserModel,
    data: {
      ...req.body,
      password: hashPassword,
      phone: encryptedPhone,
      otp: hashOtp,
      otpExpiration: new Date(Date.now() + 63000),
      countOTP: 1,
    },
  });
  emailEvent.emit("confirmEmail", {
    otp,
    to: email,
    firstName: req.body.firstName,
  });

  return succesResponse({
    res,
    data: user,
    message: "Check Your Mail inbox",
  });
};

// -----LOGIN-----
export const login = async (req, res) => {
  const { email, password } = req.body;

  //check email exist
  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, confirmEmail: true, freezedBy: { $exists: false } },
  });

  if (!user) {
    throw err.NotFoundException({ message: "Not found this email !!" });
  }

  //check password
  if (user) {
    const matched = await compareHash({
      plainText: password,
      cipherText: user.password,
    });
    if (!matched) {
      return err.BadRequestException({ message: "incorrect password" });
    }
  }

  // generate token
  const credientials = await getLoginCredientials(user);

  return succesResponse({
    res,
    status: 200,
    message: "login successfully",
    data: { credientials },
  });
};

export const refreshToken = async (req, res) => {
  const credientials = await getLoginCredientials(req.user);

  return succesResponse({
    res,
    message: "Refresh token successfull",
    data: { credientials },
    status: 200,
  });
};

// fun to verify google idToken and return payload
async function verifyGoogleAccount({ idToken }) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

//   social login by google
export const loginWithGoogle = async (req, res) => {
  const { idToken } = req.body; // googel idToken

  const { email, given_name, family_name, picture, email_verified } =
    await verifyGoogleAccount({ idToken });

  // check if email verified in google
  if (!email_verified) throw err.BadRequestException("Email not verified !!");

  // check if email in my db
  const user = await dbService.findOne({ model: UserModel, filter: { email } });

  // if exist ==>  create credientials
  if (user) {
    if (user.provider == providerEnum.Google) {
      const credientials = await getLoginCredientials(user);

      return succesResponse({
        res,
        status: 200,
        message: "login successfully",
        data: { credientials },
      });
    }
  } else {
    // if email not exist in my db ==> create user &  create credientials
    const newUser = await dbService.create({
      model: UserModel,
      data: {
        fristName: given_name,
        lastName: family_name,
        email,
        profilePic: picture,
        provider: providerEnum.Google,
      },
    });

    const credientials = await getLoginCredientials(newUser);

    return succesResponse({
      res,
      status: 200,
      message: "login successfully",
      data: { credientials },
    });
  }
};

export const logout = async (req, res) => {
  const { flag } = req.body;

  switch (flag) {
    case LogoutEnum.logout:
      const blockToken = await dbService.create({
        model: TokenModel,
        data: {
          jti: req.decoded.jti,
          userId: req.user._id,
          expiresIn: Date.now() - req.decoded.exp,
        },
      });
      return succesResponse({ res, message: "logout successful", status: 201 });

    case LogoutEnum.LogoutFromAll:
      await dbService.updateOne({
        model: UserModel,
        filter: { _id: req.user._id },
        update: { changeCredentialsTime: Date.now() },
      });
      return succesResponse({ res, message: "logout successful", status: 200 });
  }
};

export const confirmEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await dbService.findOne({ model: UserModel, filter: { email } });
  if (!user) {
    return err.NotFoundException({ message: "not found user" });
  }

  if (Date.now() > user.otpExpiration) {
    await dbService.updateOne({
      model: UserModel,
      filter: { email },
      update: { $unset: { otp: 1, otpExpiration: 1 } },
    });
    return err.BadRequestException({ message: "inValid OTP" });
  }

  const isVerfiy = await compareHash({
    plainText: otp,
    cipherText: user.otp,
    algo: hashEnum.Argon,
  });

  if (!isVerfiy) {
    return err.BadRequestException({ message: "inValid OTP" });
  }

  await dbService.updateOne({
    model: UserModel,
    filter: { email },
    update: {
      confirmEmail: true,
      $unset: { otp: 1, otpExpiration: 1, countOTP: 1 },
    },
  });
  succesResponse({ res, message: "Confirmed Email Successful" });
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await dbService.findOne({ model: UserModel, filter: { email } });

  if (!user) throw err.NotFoundException({ message: "not found user" });

  if (user.countOTP >= 4) {
    throw err.BadRequestException({
      message: "You have exceeded the maximum OTP limit.",
    });
  }
  const otp = await generateOTP();
  const hashOtp = await generetHash({ plainText: otp, algo: hashEnum.Argon });

  emailEvent.emit("confirmEmail", {
    otp,
    to: email,
    firstName: user.firstName,
  });
  await dbService.updateOne({
    model: UserModel,
    filter: { email },
    update: {
      $set: {
        otp: hashOtp,
        otpExpiration: new Date(Date.now() + 60000),
        countOTP: user.countOTP + 1,
      },
    },
  });
  succesResponse({ res, message: "the OTP resend successful" });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, confirmEmail: true },
  });
  if (!user) throw err.NotFoundException({ message: "not found user!" });

  const otp = await generateOTP();
  const hashOtp = await generetHash({ plainText: otp, algo: hashEnum.Argon });
  await dbService.updateOne({
    model: UserModel,
    filter: { email },
    update: {
      otp: hashOtp,
      otpExpiration: new Date(Date.now() + 63000),
      countOTP: 1,
    },
  });
  emailEvent.emit("forgetPassword", {
    to: email,
    otp,
    firstName: user.firstName,
  });

  succesResponse({ res, message: "check your Mail Inbox" });
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, otp: { $exists: true } },
  });

  if (!user) throw err.NotFoundException({ message: "not found user!" });

  const valid = await compareHash({
    plainText: otp,
    cipherText: user.otp,
    algo: hashEnum.Argon,
  });
  if (!valid) throw err.BadRequestException({ message: "inValid OTP!" });

  const hashPassword = await generetHash({
    plainText: newPassword,
    algo: hashEnum.Argon,
  });

  await dbService.updateOne({
    model: UserModel,
    filter: { email },
    update: {
      password: hashPassword,
      $unset: { otp: 1, otpExpiration: 1, countOTP: 1 },
    },
  });
  succesResponse({ res, message: "reset Password Successful" });
};
