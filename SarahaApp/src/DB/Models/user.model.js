import mongoose, { Schema } from "mongoose";
import {
  genderEnum,
  providerEnum,
  roleEnum,
} from "../../Utils/Enums/user.enum.js";

const userSchema = new Schema(
  {
    fristName: {
      type: String,
      required: [true, "FristName is Required"],
      minLength: 2,
      maxLength: 25,
    },
    lastName: {
      type: String,
      required: [true, "lastName is Required"],
      minLength: 2,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider == providerEnum.System;
      },
    },
    phone: String,
    DOF: Date,
    gender: {
      type: String,
      enum: Object.values(genderEnum),
      default: genderEnum.Male,
    },
    role: {
      type: String,
      enum: Object.values(roleEnum),
    },
    provider: {
      type: String,
      enum: Object.values(providerEnum),
    },
    confirmEmail: Date,
    profilePic: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
userSchema
  .virtual("fullName")
  .set(function (value) {
    const [fristName, lastName] = value?.split(" ") || [];
    this.set({ fristName, lastName });
  })
  .get(function () {
    return `${this.fristName} ${this.lastName}`;
  });
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
