import mongoose from "mongoose";
import {
  genderEnum,
  providerEnum,
  roleEnum,
} from "../Utils/Enums/user.enum.js";
import { err } from "../Utils/response/index.js";
import joi from "joi";
export const validation = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];

    for (const key of Object.keys(schema)) {
      const validationResults = schema[key].validate(req[key], {
        // to determaind if data come from body or params or query..
        abortEarly: false,
      });

      if (validationResults.error) {
        validationErrors.push({
          key,
          error: validationResults.error,
        });
      }

      if (validationErrors.length > 0) {
        console.log(validationErrors);

        throw err.BadRequestException({
          message: "Validation Error",
          extra: validationErrors,
        });
      }
    }
    return next();
  };
};

export const generalFields = {
  firstName: joi.string().min(3).max(25).messages({
    "any.requried": "FirstName is requried", // custom error message
    "string.min": "FirstName must be at least 3 character",
    "string.max": "FirstName must be at most 25 character",
  }),
  lastName: joi.string().min(3).max(25).messages({
    "any.requried": "LastName is requried", // custom error message
    "string.min": "LastName must be at least 3 character",
    "string.max": "LastName must be at most 25",
  }),
  email: joi.string().email({
    minDomainSegments: 1,
    maxDomainSegments: 3,
    tlds: { allow: ["com", "org", "net"] },
  }),
  password: joi.string().alphanum().min(8),
  confirmPassword: joi.ref("password"),
  phone: joi.string().pattern(/^01[0125]{1}[0-9]{8}$/),
  role: joi.string().valid(...Object.values(roleEnum)),
  gender: joi.string().valid(...Object.values(genderEnum)),
  provider: joi.string().valid(...Object.values(providerEnum)),
  id: joi.string().custom((value, helper) => {
    return (
      new mongoose.Types.ObjectId(value) ||
      helper.message("invalid ObjectId Format!")
    );
  }),
  otp: joi.string().pattern(/^[0-9]{6}$/),
  content: joi.string().min(3).max(500),
};
