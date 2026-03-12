import { dbService, UserModel } from "../../DB/index.js";
import { hashEnum } from "../../Utils/Enums/hash.enum.js";
import { err, succesResponse } from "../../Utils/response/index.js";
import { encrypt } from "../../Utils/security/encryption.js";
import { compareHash, generetHash } from "../../Utils/security/hash.js";

export const signup = async (req, res) => {
  const userExist = await dbService.findOne({
    model: UserModel,
    filter: { email: req.body.email },
  });
  console.log(userExist);

  if (userExist) {
    throw err.ConflictException({ message: "the user is already exist!!" });
  }

  const hashPassword = await generetHash({
    plainText: req.body.password,
    algo: hashEnum.Argon,
  });
  const encryptedPhone = await encrypt(req.body.phone);
  const user = await dbService.create({
    model: UserModel,
    data: { ...req.body, password: hashPassword, phone: encryptedPhone },
  });
  return succesResponse({
    res,
    data: user,
    message: "the user created successfully",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await dbRepo.findOne({
    model: UserModel,
    filter: { email },
    options: { lean: true },
  });

  if (!user) {
    throw err.NotFoundException({ message: "Not found this email !!" });
  }
  if (user) {
    const matched = await compareHash({
      plainText: password,
      cipherText: user.password,
    });
    if (!matched) {
      return err.BadRequestException({ message: "incorrect password" });
    }
  }
  return succesResponse({
    res,
    status: 200,
    message: "login successfully",
    data: user,
  });
};
