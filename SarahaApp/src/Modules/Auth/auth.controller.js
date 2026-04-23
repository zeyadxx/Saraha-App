import { Router } from "express";
import * as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js";
import { authentication } from "../../Middlewares/auth.middleware.js";
import { tokenEnum } from "../../Utils/Enums/user.enum.js";
import { validation } from "../../Middlewares/validation.middleware.js";

const router = Router();

router.post( "/signup",
  validation(authValidation.signupSchema),
  authService.signup,
);
router.post( "/login",
  validation(authValidation.loginSchema),
  authService.login,
);
router.post("/refresh-Token",
  authentication({ tokenType: tokenEnum.Refresh }),
  authService.refreshToken,
);
router.post("/social-login",
  validation(authValidation.socialLogin),
  authService.loginWithGoogle,
);
router.post("/logout",authentication({tokenType:tokenEnum.Access}),authService.logout)


router.patch( "/confirm-Email",
  validation(authValidation.confirmEmail),
  authService.confirmEmail,
);

router.patch(
  "/resend-otp",
  validation(authValidation.resendOtp),
  authService.resendOTP,
);



router.patch("/forgetPassword", authService.forgetPassword);

router.patch(
  "/resetPassword",
  validation(authValidation.resetPassword),
  authService.resetPassword,
);

export default router;
