import mongoose, { Schema } from "mongoose";

const testSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
    required: true,
  },
  questions: [Schema.ObjectId],
});

export const TestSet = mongoose.models.TestSet ?? mongoose.model("TestSet", testSchema);
