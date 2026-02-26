import { Router } from "express";
import * as authorServices from "./author.service.js";
const router = Router();

//2- create new collection author
router.post("/collection", async (req, res) => {
  try {
    const result = await authorServices.createColl(req.body);
    res.status(result.statusCode).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.log("faild", error);
    res.status(404).json({ message: "internal server error", error });
  }
});
export default router;
