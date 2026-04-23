import { UserModel, dbService } from "../../DB/index.js";
import { succesResponse, err } from "../../Utils/response/index.js";

import { compareHash, generetHash } from "../../Utils/security/hash.js";
import { hashEnum } from "../../Utils/Enums/hash.enum.js";

import { roleEnum } from "../../Utils/Enums/user.enum.js";

export const getProfile = async (req, res) => {
  const user = req.user;
  return succesResponse({ res, status: 201, message: "Done", data: user });
};

export const create = async (req, res) => {
  try {
    const user = await dbService.create({
      model: UserModel,
      data: req.body,
    });
    res.status(201).json({ message: "done", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

export const update = async (req, res) => {
  console.log(req.body);

  try {
    const { id } = req.params;
    const user = await dbService.updateOne({
      model: UserModel,
      update: req.body,
      filter: { _id: id },
    });
    res.status(201).json({ message: "done", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

export const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const matched = await compareHash({
    plainText: oldPassword,
    cipherText: req.user.password,
    algo: hashEnum.Argon,
  });

  if (!matched)
    throw err.BadRequestException({ message: "the old password incorrect" });

 
  const hashPassword = await generetHash({
    plainText: newPassword,
    algo: hashEnum.Argon,
  });
  await dbService.updateOne({
    model: UserModel,
    filter: { _id },
    update: { password: hashPassword },
  });
  succesResponse({ res, message: "update Password successful" });
};

export const freezeAccount = async (req, res) => {
  const { userId } = req.params;

  if (userId && req.user.role != roleEnum.Admin)
    throw err.ForbiddenException({
      message: "you are not authorized to freeze this account",
    });

  const user = await dbService.findOneAndUpdate({
    model: UserModel,
    filter: { freezedBy: { $exists: false }, _id: userId ?? req.user._id },
    update: {
      freezedAt: new Date(),
      freezedBy: req.user._id,
      $unset: { restoreBy: true, restoreAt: true },
    },
  });

  if (!user) throw err.NotFoundException({ message: "user not found" });
  succesResponse({ res, message: "Freezed Account successfully", data: user });
};

export const restoreAccount = async (req, res) => {
  const { userId } = req.params;

  const user = await dbService.findOneAndUpdate({
    model: UserModel,
    filter: {
      _id: userId,
      freezedBy: { $ne: userId },
      freezedAt: { $exists: true },
    },
    update: {
      restoreAt: new Date(),
      restoreBy: req.user._id,
      $unset: { freezedBy: true, freezedAt: true },
    },
  });

  if (!user)
    throw err.NotFoundException({ message: "user not found or not freezed" });

  succesResponse({ res, message: "restore Account successfully", data: user });
};

export const deleteAccount = async (req, res) => {
  const { userId } = req.params;

  if (userId != req.user._id && req.user.role != roleEnum.Admin)
    throw err.UnauthorizedException({
      message: "you unauthorized to delete this account",
    });
  await dbService.deleteOne({ model: UserModel, filter: { _id: userId } });

  return succesResponse({ res, message: "delete account successfully" });
};
