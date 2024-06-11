import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  subtitle: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
  modules: [
    {
      type: Schema.ObjectId,
      ref: "Module",
    },
  ],
  //   {
  //     required: false,
  //     type: [Schema.ObjectId],
  //   }
  price: {
    required: true,
    type: Number,
  },
  active: {
    required: true,
    type: Boolean,
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
    // required: false,
    // type: Schema.ObjectId,
  },
  instructor: {
    type: Schema.ObjectId,
    ref: "User",
    //required: false,
    //type: Schema.ObjectId,
  },
  quizzes: {
    required: false,
    type: Schema.ObjectId,
  },
  testimonials: [
    {
      type: Schema.ObjectId,
      ref: "Testimonial",
    },
  ],
  // {
  // required: false,
  // type: [Schema.ObjectId],
  // }
  modifiedOn: {
    required: true,
    type: Date,
  },
  createdOn: {
    required: true,
    type: Date,
  },
  learning: {
    required: true,
    type: [String],
  },
});

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
