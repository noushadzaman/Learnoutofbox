"use server";

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lesson";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function createLesson(data) {
  await dbConnect();
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = data.get("order");

    const createdLesson = await create({ title, slug, moduleId, order });
    const singleModule = await Module.findById(moduleId);
    singleModule.lessonIds.push(createdLesson?._id);
    singleModule.save();

    return createdLesson;
  } catch (err) {
    throw new Error(err);
  }
}

export async function reOrderLesson(data) {
  await dbConnect();
  try {
    await Promise.all(
      data.map(async (e) => {
        await Lesson.findByIdAndUpdate(e.id, { order: e.position });
      })
    );
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateLesson(lessonId, data) {
  await dbConnect();
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (err) {
    throw new Error(err);
  }
}

export async function changeLessonPublishState(lessonId) {
  await dbConnect();
  try {
    const lesson = await Lesson.findById(lessonId);
    const res = await Lesson.findByIdAndUpdate(
      lessonId,
      {
        active: !lesson.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteLesson(lessonId, moduleId) {
  await dbConnect();
  try {
    const singleModule = await Module.findById(moduleId);
    singleModule.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    await Lesson.findByIdAndDelete(lessonId);
    singleModule.save();
  } catch (error) {
    throw new Error(error);
  }
}