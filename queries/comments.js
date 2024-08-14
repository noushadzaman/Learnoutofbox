import { replaceMongoIdInArray } from "@/lib/convertData";
import { Comment } from "@/model/comment-model";
import { Reply } from "@/model/reply-model";
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function commentLesson({ lessonId, loggedInUserId, content }) {
  await dbConnect();
  await Comment.create({
    lessonId,
    user: loggedInUserId,
    content,
  });
}

export async function upVoteAComment({ loggedInUserId, commentId }) {
  await dbConnect();
  const comment = await Comment.findById(commentId);
  if (comment.upVotes.includes(loggedInUserId)) {
    comment.upVotes.pull(new mongoose.Types.ObjectId(loggedInUserId));
  } else {
    comment.upVotes.push(new mongoose.Types.ObjectId(loggedInUserId));
  }
  comment.save();
}

export async function replyAComment({ commentId, loggedInUserId, content }) {
  await dbConnect();
  await Reply.create({
    commentId,
    user: loggedInUserId,
    content,
  });
}

export async function getReplies(commentId) {
  await dbConnect();
  const comments = await Reply.find({ commentId: commentId })
    .populate({
      path: "user",
      model: User,
      select: ["firstName", "lastName", "designation", "profilePicture"],
    })
    .lean();
  return replaceMongoIdInArray(comments);
}

export async function getComments(lessonId) {
  await dbConnect();
  const comments = await Comment.find({ lessonId: lessonId })
    .populate({
      path: "user",
      model: User,
      select: ["firstName", "lastName", "designation", "profilePicture"],
    })
    .lean();
  const commentWithReplies = await Promise.all(
    comments.map(async (c) => {
      const replies = await getReplies(c._id);
      return { ...c, replies };
    })
  );
  return replaceMongoIdInArray(commentWithReplies);
}
