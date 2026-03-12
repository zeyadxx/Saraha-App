import { hash, compare } from "bcrypt";
import * as argon2 from "argon2";
import { hashEnum } from "../Enums/hash.enum.js";
import { SALT } from "../../../config/config.service.js";

export const generetHash = async ({
  plainText,
  algo = hashEnum.Bcrypt,
  salt = SALT,
}) => {
  let hashResult = "";
  switch (algo) {
    case hashEnum.Bcrypt:
      hashResult = await hash(plainText, salt);
      break;
    case hashEnum.Argon:
      hashResult = await argon2.hash(plainText);
    default:
      hashResult = await hash(plainText, salt);
      break;
  }
  return hashResult;
};

export const compareHash = async ({
  plainText,
  cipherText,
  algo = hashEnum.Bcrypt,
}) => {
  let match = false;
  switch (algo) {
    case hashEnum.Bcrypt:
      match = await compare(plainText, cipherText);
      break;
    case hashEnum.Argon:
      hashResult = await argon2.verify(cipherText, plainText);
    default:
      match = await compare(plainText, cipherText);
      break;
  }
  return match;
};
