import mongoose from "mongoose";
import { DB_URL } from "../../config/config.service.js";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    mongoose.connect(DB_URL);
  } catch (error) {
    console.log("Error of connected MongoDB!!", error);
  }
};
