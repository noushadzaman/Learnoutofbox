import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

const testSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

export const Test = mongoose.models.Test ?? mongoose.model("Test", testSchema);