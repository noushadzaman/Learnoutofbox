"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Test } from "@/model/test-model";
import { TestSet } from "@/model/testset-model";
import { createTest, createTestAttempt } from "@/queries/tests";
import { dbConnect } from "@/service/mongo";
import { Attempt } from "@/model/test-attempt-model";
import { AttemptSet } from "@/model/testset-attempt-model";
import mongoose from "mongoose";

export async function doCreateTest(values) {
  await dbConnect();
  try {
    const creator = await getLoggedInUser();
    const test = await createTest({ ...values, creator: creator?.email });
    return test;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTest(testId, values) {
  try {
    const exist = await TestSet.findOne({ slug: values.slug }).lean();
    if (exist) {
      return { exist: true };
    }
    const test = await TestSet.findByIdAndUpdate(testId, values).lean();
    return test;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTestQuestion(testId, values) {
  try {
    await Test.findByIdAndUpdate(testId, values);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTestQuestion(testSetId, testId) {
  try {
    await Test.findByIdAndDelete(testId);
    const testSet = await TestSet.findById(testSetId);
    testSet.questions.pull(testId);
    testSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function addTestQuestion(testId, values) {
  try {
    const testSet = await TestSet.findOne({ _id: testId });
    const test = await Test.create(values);
    testSet.questions.push(test?._id);
    testSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function doCreateTestAttempt(attempt) {
  await dbConnect();
  try {
    const test = await createTestAttempt(attempt);
    return test;
  } catch (error) {
    throw new Error(error);
  }
}

export async function doUpdateTestAttempt({ attempts, userId, title }) {
  await dbConnect();
  try {
    const attempt = await Attempt.create({
      testId: attempts.id,
      event: attempts.event,
    });
    const attemptSet = await AttemptSet.findOne({ title, userId });
    attemptSet.attempts.push(new mongoose.Types.ObjectId(attempt._id));
    attemptSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function goToPreviousTestAttempt({ lastAttempt, userId, title }) {
  await dbConnect();
  try {
    const attempt = await Attempt.findOne({
      testId: lastAttempt,
    });
    await Attempt.findByIdAndDelete(attempt._id);
    const attemptSet = await AttemptSet.findOne({ title, userId });
    attemptSet.attempts.pull(new mongoose.Types.ObjectId(attempt._id));
    attemptSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeTestPublishState(testId) {
  await dbConnect();
  const test = await TestSet.findById(testId);
  try {
    const res = await TestSet.findByIdAndUpdate(
      testId,
      {
        active: !test.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTest(testId) {
  try {
    await TestSet.findByIdAndDelete(testId);
  } catch (error) {
    throw new Error(error);
  }
}
