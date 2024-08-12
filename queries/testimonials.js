import { Testimonial } from "@/model/testimonial-model";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";
import { User } from "@/model/user-model";

export async function getTestimonialsForCourse(courseId) {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({ courseId: courseId })
      .populate({
        path: "user",
        model: User,
      })
      .lean();
    return replaceMongoIdInArray(testimonials);
  } catch (error) {
    console.log(error);
  }
}

export async function getTestimonialsForCourseAndUser(courseId, userId) {
  try {
    await dbConnect();
    const testimonial = await Testimonial.find({
      courseId: courseId,
      user: userId,
    }).lean();

    return replaceMongoIdInArray(testimonial);
  } catch (error) {
    console.log(error);
  }
}

export async function giveTestimonial(review) {
  await dbConnect();
  const exist = await Testimonial.findOne({
    courseId: review.courseId,
    user: review.user,
  });
  if (!exist) {
    const response = await Testimonial.create(review);
    return response;
  } else {
    exist.rating = review.rating;
    exist.content = review.content;
    exist.save();
  }
}
