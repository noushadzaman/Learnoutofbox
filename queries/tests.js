import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Attempt } from "@/model/test-attempt-model";
import { Test } from "@/model/test-model";
import { dbConnect } from "@/service/mongo";

export async function getTests() {
  await dbConnect();
  const test = await Test.find({ active: true }).lean();
  return replaceMongoIdInArray(test);
}

export async function getTest(title) {
  await dbConnect();
  const test = await Test.findOne({ slug: title }).lean();
  return replaceMongoIdInObject(test);
}

export async function getTestById(id) {
  await dbConnect();
  const test = await Test.findById(id.id).lean();
  return replaceMongoIdInObject(test);
}

export async function createTestAttempt(attempt) {
  await dbConnect();
  const exist = await Attempt.findOne(attempt).lean();
  if (exist) {
    return;
  }
  const response = await Attempt.create(attempt);
  return JSON.stringify(response);
}

export async function getTestAttemptByUserIdAndTitle(id, title) {
  await dbConnect();
  const testAttempt = await Attempt.findOne({ userId: id, title }).lean();
  return testAttempt;
}

export async function createTest(values) {
  await dbConnect();
  try {
    const exist = await Test.findOne({ slug: values.slug }).lean();
    if (exist) {
      return { exist: true };
    }
    const response = await Test.create(values);
    return response.toObject();
  } catch (error) {
    console.log(error);
  }
}

export async function getTestsByCreator(creator) {
  await dbConnect();
  const testsByCreator = await Test.find(creator).lean();
  return replaceMongoIdInArray(testsByCreator);
}
