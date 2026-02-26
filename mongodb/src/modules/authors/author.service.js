import { db } from "../../DB/connection.js";

export const createColl = async (data) => {
  try {
    const result = await db.collection("authors").insertOne(data);
    console.log("insert author successfull");

    return {
      acknowledged: true,
      insertedId: result.insertedId,
      statusCode: 200,
    };
  } catch (error) {
    console.log("can't insert a new author!!", error);
    return {
      acknowledged: false,
      statusCode: 409,
    };
  }
};
