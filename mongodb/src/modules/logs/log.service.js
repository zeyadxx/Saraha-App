// import { logModel } from "../../DB/models/logs.model.js";
import { db } from "./../../DB/connection.js";

export async function createColl() {
  try {
    const logModel = await db.createCollection("logs", {
      capped: true,
      size: 1000,
    });

    return {
      ok: 1,
      statusCode: 200,
      message: "create capped  collection successfull",
    };
  } catch (error) {
    console.log("error at create logs collection!!", error);
    return {
      ok: 0,
      statusCode: 401,
      message: "error at create logs collection!!",
    };
  }
}

export async function createDoc(inputs) {
  try {
    const result = await db.collection("logs").insertOne(inputs);
    console.log("insert in logs successfull");
    return {
      acknowledged: true,
      insertedId: result.insertedId,
      statusCode: 200,
      message: "insert in logs successfull",
    };
  } catch (error) {
    console.log("can't insert doc!!", error);
    return {
      acknowledged: false,
      message: "can't insert doc!!",
      statusCode: 409,
    };
  }
}
