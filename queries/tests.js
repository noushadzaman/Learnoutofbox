import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Attempt } from "@/model/test-attempt-model";
import { Test } from "@/model/test-model";
import { AttemptSet } from "@/model/testset-attempt-model";
import { TestSet } from "@/model/testset-model";
import { dbConnect } from "@/service/mongo";

export async function getTests() {
  await dbConnect();
  const test = await TestSet.find({ active: true }).lean();
  return replaceMongoIdInArray(test);
}

export async function getTest(title) {
  await dbConnect();
  const test = await TestSet.findOne({ slug: title })
    .populate({
      path: "questions",
      model: Test,
    })
    .lean();
  return replaceMongoIdInObject(test);
}

export async function getTestById(id) {
  await dbConnect();
  const testSet = await TestSet.findById(id.id).lean();
  const questions = await Promise.all(
    testSet.questions.map(async (ts) => {
      const test = await Test.findById(ts).lean();
      return test;
    })
  );
  // console.log({ ...testSet, questions: questions });
  return replaceMongoIdInObject({ ...testSet, questions: questions });
}

export async function createTestAttempt(attempt) {
  await dbConnect();
  const exist = await AttemptSet.findOne(attempt).lean();
  if (exist) {
    return;
  }
  const response = await AttemptSet.create(attempt);
  return JSON.stringify(response);
}

export async function getTestAttemptByUserIdAndTitle(id, title) {
  await dbConnect();
  const testAttempt = await AttemptSet.findOne({ userId: id, title })
    .populate({
      path: "attempts",
      model: Attempt,
    })
    .lean();
  return testAttempt;
}

export async function createTest(values) {
  await dbConnect();
  try {
    const exist = await TestSet.findOne({ slug: values.slug }).lean();
    if (exist) {
      return { exist: true };
    }
    const response = await TestSet.create(values);
    return response.toObject();
  } catch (error) {
    console.log(error);
  }
}

export async function getTestsByCreator(creator) {
  await dbConnect();
  const testsByCreator = await TestSet.find(creator).lean();
  return replaceMongoIdInArray(testsByCreator);
}
