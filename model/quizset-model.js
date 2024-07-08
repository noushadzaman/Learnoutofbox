import mongoose, { Schema } from "mongoose";

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
      ref: "Quiz",
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
  mongoose.models.Quizset ?? mongoose.model("Quizset", quizSetSchema);
