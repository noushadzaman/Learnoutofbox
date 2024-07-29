import { replaceMongoIdInObject } from "@/lib/convertData";
import { Attempt } from "@/model/test-attempt-model";
import { Test } from "@/model/test-model";
import { dbConnect } from "@/service/mongo";

export async function getTest(title) {
  await dbConnect();
  const test = await Test.findOne({ slug: title }).lean();
  return replaceMongoIdInObject(test);
}

export async function createTestAttempt(attempt) {
  await dbConnect();
  const exist = await Attempt.findOne(attempt).lean();
  if (exist) {
    return;
  }
  const response = await Attempt.create(attempt).lean();
  return response;
}

export async function getTestAttemptByUserIdAndTitle(id, title) {
  await dbConnect();
  const testAttempt = await Attempt.findOne({ userId: id, title }).lean();
  return testAttempt;
}
