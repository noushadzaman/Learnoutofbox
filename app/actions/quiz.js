"use server";

import { getSlug } from "@/lib/convertData";
import { QuizSet } from "@/model/quizset-model";
import { createQuiz } from "@/queries/quizzes";

export async function updateQuizSet(quizSet, dataToUpdate) {
  try {
    await QuizSet.findByIdAndUpdate(quizSet, dataToUpdate);
  } catch (err) {
    throw new Error(err);
  }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
  try {
    const transformedQuizData = {};
    transformedQuizData["question"] = quizData["title"];
    transformedQuizData["description"] = quizData["description"];
    transformedQuizData["slug"] = getSlug(quizData["title"]);
    transformedQuizData["options"] = [
      {
        text: quizData.optionA.label,
        is_correct: quizData.optionA.isTrue,
      },
      {
        text: quizData.optionB.label,
        is_correct: quizData.optionB.isTrue,
      },
      {
        text: quizData.optionC.label,
        is_correct: quizData.optionC.isTrue,
      },
      {
        text: quizData.optionD.label,
        is_correct: quizData.optionD.isTrue,
      },
    ];
    const createdQuizId = await createQuiz(transformedQuizData);

    const quizSet = await QuizSet.findById(quizSetId);
    quizSet.quizIds.push(createdQuizId);
    quizSet.save();
  } catch (err) {
    throw new Error(err);
  }
}

export async function doCreateQuizSet(data) {
  try {
    data["slug"] = getSlug(data.title);
    const createdQuizSet = await QuizSet.create(data);
    return createdQuizSet?._id.toString();
  } catch (err) {
    throw new Error(err);
  }
}
