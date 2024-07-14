import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  profilePicture: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  designation: {
    required: true,
    type: Number,
  },
});

export const Review =
  mongoose.models.Review ?? mongoose.model("Review", ReviewSchema);
