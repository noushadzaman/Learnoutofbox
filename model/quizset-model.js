import mongoose, { Schema } from "mongoose";
import { Quiz } from "./quizzes-model";

const quizSetSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
  },
  quizIds: [
    {
      ref: Quiz,
      type: Schema.ObjectId,
    },
  ],
  active: {
    required: true,
    default: false,
    type: Boolean,
  },
});

export const QuizSet =
  mongoose.models.QuizSet ?? mongoose.model("QuizSet", quizSetSchema);
