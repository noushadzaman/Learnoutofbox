import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { dbConnect } from "@/service/mongo";

export async function create(moduleData) {
  await dbConnect();
  try {
    const singleModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(singleModule));
  } catch (e) {
    throw new Error(e);
  }
}

export async function getModule(moduleId) {
  await dbConnect();
  try {
    const singleModule = await Module.findById(moduleId)
      .populate({
        path: "lessonIds",
        model: Lesson,
      })
      .lean();

    return replaceMongoIdInObject(singleModule);
  } catch (e) {
    throw new Error(e);
  }
}

export async function getModuleBySlug(moduleSlug) {
  await dbConnect();
  try {
    const singleModule = await Module.findOne({ slug: moduleSlug }).lean();
    return replaceMongoIdInObject(singleModule);
  } catch (e) {
    throw new Error(e);
  }
}
