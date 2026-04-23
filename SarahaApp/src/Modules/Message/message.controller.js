import { Router } from "express";
import * as messageService from "./message.service.js";
import * as messageValidation from "./message.validation.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/auth.middleware.js";
import { tokenEnum } from "../../Utils/Enums/user.enum.js";
const router = Router();

router.post(
  "/:recevirId/send-message",
  validation(messageValidation.sendMessageSchema),
  messageService.sendMessage,
);

router.get("/get-message", authentication({ tokenType: tokenEnum.Access }),messageService.getMessage);
export default router;
