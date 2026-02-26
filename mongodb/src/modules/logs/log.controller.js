import { Router } from "express";
import * as logsServies from "./log.service.js";

const router = Router();

//3- create collection logs capped
router.post("/collection/capped", async (req, res) => {
  try {
    const result = await logsServies.createColl();
    res
      .status(result.statusCode)
      .json({ ok: result.ok, message: result.message });
  } catch (error) {
    console.log("internal server error", error);
    res.status(404).json({ message: "internal server error" });
  }
});

//7. Insert a new log into the logs collection
router.post("/", async (req, res) => {
  try {
    const result = await logsServies.createDoc(req.body);
    res.status(result.statusCode).json({
      message: result.message,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.log("internal server error", error);
    res.status(404).json({ message: "internal server error" });
  }
});


export default router;
