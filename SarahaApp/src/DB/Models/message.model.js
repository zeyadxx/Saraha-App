import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId },
    recevirId: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: { type: String, minLength: 3, maxLength: 500, required: true },
  },
  { timestamps: true },
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
