import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  subtitle: {
    required: false,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: false,
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
    default: 0,
    type: Number,
  },
  active: {
    required: true,
    default: false,
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
  quizSet: {
    required: false,
    type: Schema.ObjectId,
    ref: "Quizset"
  },
  // testimonials: [
  //   {
  //     type: Schema.ObjectId,
  //     ref: "Testimonial",
  //   },
  // ],
  // {
  // required: false,
  // type: [Schema.ObjectId],
  // }
  modifiedOn: {
    required: true,
    default: Date.now(),
    type: Date,
  },
  createdOn: {
    required: true,
    default: Date.now(),
    type: Date,
  },
  learning: {
    required: false,
    type: [String],
  },
});

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
