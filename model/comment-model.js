import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  lessonId: {
    type: Schema.ObjectId,
    ref: "Lesson",
  },
  upVotes: {
    required: true,
    type: Array,
  },
});

export const Comment =
  mongoose.models.Comment ?? mongoose.model("Comment", commentSchema);
