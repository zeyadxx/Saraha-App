import joi from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";

export const signupSchema = {
  body: joi.object({
    firstName: generalFields.firstName.required(),
    lastName: generalFields.lastName.required(),
    email: generalFields.email.required(),
    password: joi.string().alphanum().min(8),
    confirmPassword: joi.ref("password"),
    phone: generalFields.phone,
    role: generalFields.role,
    gender: generalFields.gender,
    provider: generalFields.provider,
    id: generalFields.id,
  }),
};

export const loginSchema = {
  body: joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }),
};

export const confirmEmail = {
  body: joi.object({
    email: generalFields.email.required(),
    otp: generalFields.otp.required(),
  }),
};
export const socialLogin = {
  body: joi.object({
    idToken: joi.string().required(),
  }),
};
export const resendOtp = {
  body: joi.object({
    email: generalFields.email.required(),
  }),
};




export const resetPassword = {
  body: joi.object({
    email: generalFields.email.required(),
    otp: generalFields.otp.required(),
    newPassword: generalFields.password.required(),
    confirmPassword: joi.ref("newPassword"),
  }),
};