import { err, succesResponse } from "../../Utils/response/index.js";
import { dbService, MessageModel, UserModel } from "../../DB/index.js";

export const sendMessage = async (req, res) => {
  const { content } = req.body;
  const { recevirId } = req.params;

  const recevir = await dbService.findOne({
    model: UserModel,
    filter: { _id: recevirId, freezedAt: { $exists: false } },
  });
  if (!recevir) throw err.NotFoundException("User Not Found!!");

  const message = await dbService.create({
    model: MessageModel,
    data: { content, recevirId },
  });
  succesResponse({ res, message: "send Message Successful", data: message });
};

export const getMessage = async (req, res) => {
  const message = await dbService.find({
    model: MessageModel,
    filter: { recevirId: req.user._id },
    select: "content createdAt -_id",
  });

  succesResponse({ res, message: "get Messages Successful", data: message });
};
