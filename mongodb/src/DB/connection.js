import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017/");

export const authDB = async () => {
  try {
    await client.connect();
    console.log("the connection of DB successfull");
  } catch (error) {
    console.log(`faild of connection with DB ${error}`);
  }
};
export const db = client.db("Ass8");
