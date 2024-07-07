import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Module } from "@/model/module-model";
import { Report } from "@/model/report-model";
import mongoose from "mongoose";
import { getCourseDetails } from "./courses";

export async function getReport(filter) {
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return replaceMongoIdInObject(report);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createWatchReport({
  userId,
  courseId,
  moduleId,
  lessonId,
}) {
  try {
    let report = await Report.findOne({
      course: courseId,
      student: userId,
    });

    if (!report) {
      report = await Report.create({
        course: courseId,
        student: userId,
      });
    }

    const foundLesson = report.totalCompletedLessons.find(
      (lessonId) => lessonId.toString() === lessonId
    );

    if (!foundLesson) {
      report.totalCompletedLessons.push(new mongoose.Types.ObjectId(lessonId));
    }

    const singleModule = await Module.findById(moduleId);
    const lessonIdsToChecks = singleModule.lessonIds;
    const completedLessonIds = report.totalCompletedLessons;

    const isModuleComplete = lessonIdsToChecks.every((lesson) =>
      completedLessonIds.includes(lesson)
    );

    if (isModuleComplete) {
      const foundModule = report.totalCompletedModules.find(
        (module) => module.toString() === moduleId
      );

      if (!foundModule) {
        report.totalCompletedModules.push(
          new mongoose.Types.ObjectId(moduleId)
        );
      }

      const course = await getCourseDetails(courseId);
      const modulesInCourse = course?.modules;
      const moduleCount = modulesInCourse?.length ?? 0;

      const completedModule = report.totalCompletedModules;
      const completedModuleCount = completedModule?.length ?? 0;

      if (completedModuleCount >= 1 && completedModuleCount === moduleCount) {
        report.completion_date = Date.now();
      }
    }
    report.save();
  } catch (error) {
    throw new Error(error);
  }
}
