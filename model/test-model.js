import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

export const Test =
  mongoose.models.Test ?? mongoose.model("Test", questionSchema);
