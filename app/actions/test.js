"use server";

import { Attempt } from "@/model/test-attempt-model";
import { createTestAttempt } from "@/queries/tests";

export async function doCreateTestAttempt(attempt) {
  try {
    const test = await createTestAttempt(attempt);
    return test;
  } catch (error) {
    console.log(error);
  }
}

export async function doUpdateTestAttempt({ attempts, userId, title }) {
  try {
    const attempt = await Attempt.findOneAndUpdate({ title, userId });
    attempt.attempts = attempts;
    attempt.save();
  } catch (error) {
    console.log(error);
  }
}