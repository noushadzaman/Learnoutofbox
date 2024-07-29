import mongoose, { Schema } from "mongoose";

const attemptsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

const attemptSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
  },
  attempts: [attemptsSchema],
});

export const Attempt =
  mongoose.models.Attempt ?? mongoose.model("Attempt", attemptSchema);
