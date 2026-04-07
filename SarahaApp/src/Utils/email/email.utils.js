import { EMAIL, PASSWOED_EMAIL } from "../../../config/config.service.js";
import nodemailer from "nodemailer"

export const sendEmail = async ({
  to = "",
  subject = "",
  text = "",
  html = "",
  attachments = [],
  cc = "",
  bcc = "",
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL, // my own email i will sent with it
      pass: PASSWOED_EMAIL,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: EMAIL,
      to,
      subject,
      text,
      html,
      attachments,
      cc,
      bcc,
    });
    console.log("Message send : ", info.messageId);
  } catch (error) {
    console.error("Error at sending mail: ", error);
  }
};

export const emailSubject = {
  confirmEmail: "Confirm Your Email",
  resetPassword: "Rest Your Password",
  welcome: "welcome to Saraha App",
  forgetPassword:"Forget Password"
};
