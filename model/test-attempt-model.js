import mongoose, { Schema } from "mongoose";

const attemptsSchema = new Schema({
  testId: {
    type: Schema.ObjectId,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

export const Attempt =
  mongoose.models.Attempt ?? mongoose.model("Attempt", attemptsSchema);
