import mongoose from "mongoose";
import { DB_URL } from "../../config/config.service.js";

export const connectDB = async () => {
  mongoose.connect(DB_URL);

  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.log("Error of connected MongoDB!!", error);
  }
};
