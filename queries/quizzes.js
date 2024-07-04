import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { QuizSet } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";

export async function getAllQuizSets(excludeUnPublished) {
  try {
    let quizSets = [];
    if (excludeUnPublished) {
      quizSets = await QuizSet.find({ active: true }).lean();
    } else {
      quizSets = await QuizSet.find().lean();
    }
    return replaceMongoIdInArray(quizSets);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getQuizSetById(id) {
  try {
    const quizSets = await QuizSet.findById(id)
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();

    return replaceMongoIdInObject(quizSets);
  } catch (err) {
    throw new Error(err);
  }
}

export async function createQuiz(quizData) {
  try {
    const quiz = await Quiz.create(quizData);
    return quiz._id.toString();
  } catch (err) {
    throw new Error(err);
  }
}
