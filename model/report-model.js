import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  totalCompletedLessons: {
    required: true,
    type: Array,
  },
  totalCompletedModules: {
    required: true,
    type: Array,
  },
  course: {
    ref: "Course",
    type: Schema.ObjectId,
  },
  student: {
    ref: "User",
    type: Schema.ObjectId,
  },
  quizAssessment: {
    ref: "Assessment",
    type: Schema.ObjectId,
  },
});

export const Report =
  mongoose.models.Report ?? mongoose.model("Report", reportSchema);
