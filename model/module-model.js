import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  active: {
    required: true,
    default: false,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  course: {
    required: true,
    type: Schema.ObjectId,
  },
  lessonIds: [
    {
      ref: "Lesson",
      type: Schema.ObjectId,
    },
  ],
  order: {
    required: true,
    type: Number,
  },
});

export const Module =
  mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
