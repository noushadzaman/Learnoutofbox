"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Attempt } from "@/model/test-attempt-model";
import { Test } from "@/model/test-model";
import { createTest, createTestAttempt } from "@/queries/tests";
import { dbConnect } from "@/service/mongo";

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
    const exist = await Test.findOne({ slug: values.slug }).lean();
    if (exist) {
      return { exist: true };
    }
    const test = await Test.findByIdAndUpdate(testId, values).lean();
    return test;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTestQuestion(testId, values) {
  try {
    const test = await Test.findOne({ _id: testId });
    const newQuestion = {
      ...values,
    };
    test.questions[values.id - 1] = newQuestion;
    test.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function addTestQuestion(testId, values) {
  try {
    const test = await Test.findOne({ _id: testId });
    const newQuestion = {
      id: test.questions.length + 1,
      ...values,
    };
    test.questions.push(newQuestion);
    test.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function doCreateTestAttempt(attempt) {
  await dbConnect();
  try {
    const test = await createTestAttempt(attempt);
    console.log(test);
    return test;
  } catch (error) {
    throw new Error(error);
  }
}

export async function doUpdateTestAttempt({ attempts, userId, title }) {
  await dbConnect();
  try {
    const attempt = await Attempt.findOne({ title, userId });
    attempt.attempts = attempts;
    attempt.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeTestPublishState(testId) {
  await dbConnect();
  const test = await Test.findById(testId);
  try {
    const res = await Test.findByIdAndUpdate(
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
    await Test.findByIdAndDelete(testId);
  } catch (error) {
    throw new Error(error);
  }
}
