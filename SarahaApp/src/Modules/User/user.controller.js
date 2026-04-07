import { Router } from "express";
import * as userService from "./user.service.js";
import {
  authentication,
  authorization,
} from "../../Middlewares/auth.middleware.js";
import { roleEnum, tokenEnum } from "../../Utils/Enums/user.enum.js";
import { localFileUpload } from "../../Utils/multer/local.multer.js";
import { succesResponse } from "../../Utils/response/succes.response.js";
import * as userValidation from "../User/user.validation.js";
import { validation } from "../../Middlewares/validation.middleware.js";
const router = Router();

router.get(
  "/getProfile",
  authentication({}),
  authorization([roleEnum.Admain]),
  userService.getProfile,
);

router.post("/create", userService.create);
router.patch("/update/:id", userService.update);

router.patch(
  "/upload-file",
  localFileUpload().single("attachment"),
  (req, res) => {
    succesResponse({ res, data: req.file });
  },
);

router.patch(
  "/updatePassword",
  authentication({ tokenType: tokenEnum.Access }),
  validation(userValidation.updatePassword),
  userService.updatePassword,
);
router.delete(
  "{/:userId}/freezeAccount",
  authentication({ tokenType: tokenEnum.Access }),
  authorization([roleEnum.Admin, roleEnum.User]),
  validation(userValidation.freezeAccount),
  userService.freezeAccount,
);

router.patch(
  "/:userId/restoreAccount",
  authentication({ tokenType: tokenEnum.Access }),
  authorization([roleEnum.Admin]),
  validation(userValidation.restoreAccount),
  userService.restoreAccount,
);

router.delete(
  "/:userId/deleteAccount",
  authentication({ tokenType: tokenEnum.Access }),
  validation(userValidation.deleteAccount),
  userService.deleteAccount,
);

export default router;
