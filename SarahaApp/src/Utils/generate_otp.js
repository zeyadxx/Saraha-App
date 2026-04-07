import otpGenerator from "otp-generator";
export const generateOTP = () => {
  
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });  
    return otp;
}