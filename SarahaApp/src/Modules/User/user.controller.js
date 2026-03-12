import { Router } from "express";
import * as userService from "./user.service.js";
const router = Router();

router.get("/find", userService.find);
router.post("/create",userService.create)
router.patch("/update/:id",userService.update)
export default router;
