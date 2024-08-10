"use server";

import { giveTestimonial } from "@/queries/testimonials";
import { dbConnect } from "@/service/mongo";

export async function doCreateReview(newReview) {
  await dbConnect();
  try {
    await giveTestimonial(newReview);
  } catch (error) {
    throw new Error(error);
  }
}
