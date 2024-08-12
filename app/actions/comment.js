"use server";

import { dbConnect } from "@/service/mongo";
import {
  commentLesson,
  replyAComment,
  upVoteAComment,
} from "@/queries/comments";

export async function commentInLesson({ lessonId, loggedInUserId, content }) {
  await dbConnect();
  try {
    await commentLesson({ lessonId, loggedInUserId, content });
  } catch (error) {
    console.log(error);
  }
}

export async function upVoteComment({ loggedInUserId, commentId }) {
  await dbConnect();
  try {
    await upVoteAComment({ loggedInUserId, commentId });
  } catch (error) {
    console.log(error);
  }
}

export async function replyComment({ commentId, loggedInUserId, content }) {
  await dbConnect();
  try {
    await replyAComment({ commentId, loggedInUserId, content });
  } catch (error) {
    console.log(error);
  }
}
