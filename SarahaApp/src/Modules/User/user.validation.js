import joi from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";

export const updatePassword = {
  body: joi.object({
    oldPassword: generalFields.password.required(),
    newPassword: generalFields.password.required(),
    confirmPassword: joi.ref("newPassword"),
  }),
};

export const freezeAccount = {
  params: joi.object({
    userId: generalFields.id,
  }),
};

export const restoreAccount = {
  params: joi.object({
    userId: generalFields.id.required(),
  }),
};


export const deleteAccount = {
  params: joi.object({
    userId: generalFields.id.required(),
  }),
};
