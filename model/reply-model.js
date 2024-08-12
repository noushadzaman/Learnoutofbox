import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  commentId: {
    required: true,
    type: Schema.ObjectId,
  },
});

export const Reply =
  mongoose.models.Reply?? mongoose.model("Reply", replySchema);
