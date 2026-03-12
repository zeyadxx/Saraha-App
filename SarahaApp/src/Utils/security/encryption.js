import crypto from "node:crypto";
import { SECRET_KEY } from "../../../config/config.service.js";

const ENCRYPTION_SECRET_KEY = SECRET_KEY;
const IV_LENGTH = 16;
export const encrypt = async (plainText) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = await crypto.createCipheriv(
    "aes-256-cbc",
    ENCRYPTION_SECRET_KEY,
    iv,
  );

  let encryptedData = cipher.update(plainText, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = async (encryptedData) => {
  const [iv, encryptedText] = encryptedData.split(":");

  const binaryLike = Buffer.from(iv, "hex"); // reconvert iv from hex to binary

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_SECRET_KEY,
    binaryLike,
  );

  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};
