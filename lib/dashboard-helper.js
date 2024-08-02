import {
  getCourseDetails,
  getCourseDetailsByInstructor,
} from "../queries/courses";
import { getUserDetails, getUserByEmail } from "../queries/users";
import { getReport } from "@/queries/reports";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateReviewData = async (reviews) => {
  const populatedReviews = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user?._id);
      review["studentName"] = `${student?.firstName} ${student?.lastName}`;
      return review;
    })
  );

  return populatedReviews;
};

const populateEnrollmentData = async (enrollments) => {
  console.log(enrollments);
  
  const populatedEnrollments = await Promise.all(
    enrollments.map(async (enrollment) => {
      const student = await getUserDetails(enrollment?.student?._id);
      enrollment["studentName"] = `${student?.firstName} ${student?.lastName}`;
      enrollment["studentEmail"] = student?.email;

      const filter = {
        course: enrollment?.course?._id,
        student: enrollment?.student?._id,
      };
      const report = await getReport(filter);

      enrollment["progress"] = 0;
      enrollment["quizMark"] = 0;

      if (report) {
        const course = await getCourseDetails(enrollment?.course?._id);
        const totalModules = course?.modules?.length;
        const totalCompletedModules = report?.totalCompletedModules?.length;
        const progress = (totalCompletedModules / totalModules) * 100;
        enrollment["progress"] = progress;

        const quizzes = report?.quizAssessment?.assessments;
        const quizzesTaken = quizzes.filter((q) => q.attempted);
        const totalCorrect = quizzesTaken
          .map((q) => {
            const item = q?.options;
            return item.filter((i) => {
              return i.isCorrect === true && i.isSelected === true;
            });
          })
          .filter((e) => e.length > 0)
          .flat();
        const marksFromQuizzes = totalCorrect?.length * 5;
        enrollment["quizMark"] = marksFromQuizzes;
      }
      return enrollment;
    })
  );
  return populatedEnrollments;
};

export async function getInstructorDashboardData(email, dataType) {
  try {
    const instructor = await getUserByEmail(email);
    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case REVIEW_DATA:
        return populateReviewData(data?.reviews);
      case ENROLLMENT_DATA:
        return populateEnrollmentData(data?.enrollments);

      default:
        return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
