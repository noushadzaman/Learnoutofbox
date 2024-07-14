import { replaceMongoIdInArray } from "@/lib/convertData";
import { Review } from "@/model/review-model";
import { dbConnect } from "@/service/mongo";

export async function getReviews() {
  await dbConnect();
  const review = await Review.find().lean();
  return replaceMongoIdInArray(review);
}
