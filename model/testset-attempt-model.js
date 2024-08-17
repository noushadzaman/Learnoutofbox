import mongoose, { Schema } from "mongoose";

const attemptSetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
  },
  attempts: [Schema.ObjectId],
});

export const AttemptSet =
  mongoose.models.AttemptSet ?? mongoose.model("AttemptSet", attemptSetSchema);
