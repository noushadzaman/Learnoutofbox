"use server";

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lesson";

export async function createLesson(data) {
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
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (err) {
    throw new Error(err);
  }
}
