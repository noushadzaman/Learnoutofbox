import {
  groupBy,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { User } from "@/model/user-model";
import { getEnrollmentsForCourse } from "./enrollment";
import { getTestimonialsForCourse } from "./testimonials";
import { Lesson } from "@/model/lesson-model";
import { QuizSet } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { dbConnect } from "@/service/mongo";
import { Enrollment } from "@/model/enrollment-model";

export async function getCourseCount(categoryId) {
  await dbConnect();
  let query;
  if (categoryId) {
    query = { category: categoryId };
  }
  const count = await Course.countDocuments(query);
  return count;
}

export async function getCourseList(categoryId, page, course, price) {
  await dbConnect();
  const regex = new RegExp(course, "i");
  const sort = {};
  if (price !== undefined) {
    sort.price = price;
  }
  const category = {};
  if (categoryId) {
    category.category = categoryId;
  }
  const courses = await Course.find({
    active: true,
    title: { $regex: regex },
    ...category,
  })
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .sort(sort)
    .limit(9)
    .skip(Number(page - 1) * 9)
    .lean();

  const coursesWithEnrollmentsNumber = await Promise.all(
    courses.map(async (course) => {
      const enrollments = await Enrollment.find({ course: course._id }).lean();
      return { ...course, enrollments };
    })
  );

  return replaceMongoIdInArray(coursesWithEnrollmentsNumber);
}

export async function getCourseDetails(id) {
  await dbConnect();
  const course = await Course.findById(id)
    .populate({
      path: "modules",
      model: Module,
      populate: {
        path: "lessonIds",
        model: Lesson,
      },
    })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "quizSet",
      model: QuizSet,
      populate: {
        path: "quizIds",
        model: Quiz,
      },
    })
    .lean();

  return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
  await dbConnect();
  const publishedCourses = await Course.find({
    instructor: instructorId,
    active: true,
  }).lean();

  let courseWiseEnrollments = [];
  const enrollments = await Promise.all(
    publishedCourses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      if (enrollment.length > 0) {
        courseWiseEnrollments.push({
          title: course.title,
          enrolled: enrollment.length,
        });
      }
      return enrollment;
    })
  );

  const enrollmentsGroupedByMonth = [];
  const currentDate = new Date();

  const twelveMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 11,
    1
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  enrollments.flat().forEach((item) => {
    const date = new Date(item.enrollment_date);
    if (date >= twelveMonthsAgo) {
      const monthName = monthNames[date.getMonth()];

      let monthGroup = enrollmentsGroupedByMonth.find(
        (group) => group.month === monthName
      );

      if (!monthGroup) {
        monthGroup = { month: monthName, enrollments: [] };
        enrollmentsGroupedByMonth.push(monthGroup);
      }

      monthGroup.enrollments.push(item);
    }
  });
  enrollmentsGroupedByMonth.sort(
    (a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month)
  );

  const groupedByCourses = groupBy(enrollments.flat(), ({ course }) => course);

  const totalRevenue = publishedCourses.reduce((acc, course) => {
    const quantity = groupedByCourses[course._id]
      ? groupedByCourses[course._id].length
      : 0;
    return acc + quantity * course.price;
  }, 0);

  const totalEnrollments = enrollments.reduce(function (acc, obj) {
    return acc + obj.length;
  }, 0);

  const testimonials = await Promise.all(
    publishedCourses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );
  const totalTestimonials = testimonials.flat();

  const avgRating =
    totalTestimonials.reduce(function (acc, obj) {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  if (expand) {
    const allCourses = await Course.find({ instructor: instructorId }).lean();
    return {
      courses: allCourses?.flat(),
      enrollments: enrollments?.flat(),
      reviews: totalTestimonials,
    };
  }

  return {
    courses: publishedCourses.length,
    courseWiseEnrollments: courseWiseEnrollments,
    dateWiseEnrollments: enrollmentsGroupedByMonth,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
    revenue: totalRevenue,
  };
}

export async function create(courseData) {
  await dbConnect();
  try {
    const course = await Course.create(courseData);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCourseDetailsForCard(id) {
  await dbConnect();
  const course = await Course.findById(id)
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "category",
      model: Category,
    })
    .select([
      "title",
      "price",
      "description",
      "modules",
      "testimonials",
      "instructor",
      "thumbnail",
      "category",
    ])
    .lean();

  return replaceMongoIdInObject(course);
}

export async function getCourseDemoVideos(courseId) {
  await dbConnect();
  const course = await Course.findById(courseId).select(["modules"]).lean();

  const lessons = await Promise.all(
    course?.modules.map(async (courseModule) => {
      const modules = await Module.findById(courseModule).lean();

      const moduleLessons = await Promise.all(
        modules?.lessonIds.map(async (singleLesson) => {
          const lesson = await Lesson.findOne({
            $and: [{ _id: singleLesson }, { isDemo: true }],
          }).lean();

          return lesson || null;
        })
      );
      return moduleLessons.filter(Boolean);
    })
  );
  return replaceMongoIdInArray(lessons.flat());
}
