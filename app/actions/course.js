"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function createCourse(data) {
  await dbConnect();
  try {
    const loggedInUser = await getLoggedInUser();
    data["instructor"] = loggedInUser?.id;
    const course = await create(data);
    return course;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCourse(courseId, dataToUpdate) {
  await dbConnect();
  try {
    await Course.findByIdAndUpdate(courseId, dataToUpdate);
  } catch (e) {
    throw new Error(e);
  }
}

export async function changeCoursePublishState(courseId) {
  await dbConnect();
  const course = await Course.findById(courseId);
  try {
    const res = await Course.findByIdAndUpdate(
      courseId,
      {
        active: !course.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCourse(courseId) {
  await dbConnect();
  try {
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateQuizSetCourse(courseId, dataToUpdate) {
  await dbConnect();
  try {
    const data = {};
    data["quizSet"] = new mongoose.Types.ObjectId(dataToUpdate.quizSetId);
    await Course.findByIdAndUpdate(courseId, data);
  } catch (error) {
    throw new Error(error);
  }
}
