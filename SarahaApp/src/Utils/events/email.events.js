import { EventEmitter } from "node:events";
import { emailSubject, sendEmail } from "../email/email.utils.js";
import { template,templateForgetPassword } from "../email/generalTemplate.js";

export const emailEvent = new EventEmitter();

emailEvent.on("confirmEmail", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.confirmEmail,
    html: template({ otp: data.otp, firstName: data.firstName }),
  }).catch((err) => {
    console.log("error at sending confirm email ", err);
  });
});

emailEvent.on("resendOTP", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.confirmEmail,
    html: template({ otp: data.otp, firstName: data.firstName }),
  }).catch((err) => {
    console.log("error at sending Resend OTP ", err);
  });
});


emailEvent.on("forgetPassword", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.forgetPassword,
    html: templateForgetPassword({ otp: data.otp, firstName: data.firstName }),
  }).catch((err) => {
    console.log("error at sending confirm email ", err);
  });
});