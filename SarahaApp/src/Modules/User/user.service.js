import { Schema, Mongoose } from "mongoose";
import { UserModel, dbService } from "../../DB/index.js";
import { succesResponse, err } from "../../Utils/response/index.js";
export const find = async (req, res) => {
  try {
    const user = await dbService.find({
      model: UserModel,
      select: "name email phone",
      options: { limit: 3, lean: true },
    });
    return succesResponse({res,status:201,message:"Done",data:user})
  } catch (error) {
    console.log(error);
   return err.InternalServerException()
    
  }
};

export const create = async (req, res) => {
  console.log(req.body);

  try {
    const user = await dbService.create({
      model: UserModel,
      data: req.body,
    });
    res.status(201).json({ message: "done", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

export const update = async (req, res) => {
  console.log(req.body);

  try {
    const { id } = req.params;
    const user = await dbService.updateOne({
      model: UserModel,
      update: req.body,
      filter: { _id: id },
    });
    res.status(201).json({ message: "done", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};
