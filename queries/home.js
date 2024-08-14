import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollment-model";
import { Review } from "@/model/review-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { Watch } from "@/model/watch-model";
import { dbConnect } from "@/service/mongo";

export async function getMostPopularCourses() {
  await dbConnect();
  try {
    const result = await Enrollment.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 3,
      },
    ]);
    return replaceMongoIdInArray(result);
  } catch (error) {
    console.error("Error fetching top three courses:", error);
  }
}

export async function getReviews() {
  await dbConnect();
  const review = await Review.find().lean();
  return replaceMongoIdInArray(review);
}

export async function getEnrolledCount() {
  try {
    const count = await Enrollment.countDocuments();
    return count;
  } catch (error) {
    console.error("Error counting instructors:", error);
    throw error;
  }
}

export async function getInstructorCount() {
  try {
    const count = await User.countDocuments({ role: "instructor" });
    return count;
  } catch (error) {
    console.error("Error counting instructors:", error);
    throw error;
  }
}

export async function getFinishedLessonsCount() {
  await dbConnect();
  try {
    const count = await Watch.countDocuments();
    return count;
  } catch (error) {
    throw error;
  }
}

export async function getAverageRating() {
  await dbConnect();
  try {
    const result = await Testimonial.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating = result.length > 0 ? result[0].averageRating : 0;
    return averageRating;
  } catch (error) {
    console.error("Error calculating average rating:", error);
    throw error;
  }
}
