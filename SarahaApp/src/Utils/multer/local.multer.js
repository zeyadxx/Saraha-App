import multer from "multer";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";

export const localFileUpload = ({ customPath = "general" } = {}) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.resolve(`./uploads/${customPath}`);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqeFileName = randomUUID() + "_" + file.originalname;
      cb(null, uniqeFileName);
    },
  });
  return multer({ storage });
};
