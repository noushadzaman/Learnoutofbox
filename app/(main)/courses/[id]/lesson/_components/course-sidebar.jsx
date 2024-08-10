import { CourseProgress } from "@/components/course-progress";
import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import SidebarModules from "./sidebar-modules";
import DownloadCertificate from "./download-certificate";
import GiveReview from "./give-review";
import { getReport } from "@/queries/reports";
import Quiz from "./quiz";
import { getTestimonialsForCourseAndUser } from "@/queries/testimonials";

export const CourseSidebar = async ({ courseId, loggedInUserId }) => {
  const course = await getCourseDetails(courseId);
  const loggedInUser = await getLoggedInUser();

  const report = await getReport({ course: courseId, student: loggedInUser.id });

  const testimonial = await getTestimonialsForCourseAndUser(courseId, loggedInUserId);

  const totalCompletedModules = report?.totalCompletedModules ? report?.totalCompletedModules.length : 0;
  const totalModules = course?.modules ? course.modules.length : 0;

  const totalProgress = (totalModules > 0) ? (totalCompletedModules / totalModules) * 100 : 0;

  const updatedModules = await Promise.all(course?.modules.map(async (module) => {
    const moduleId = module._id.toString();
    const lessons = module?.lessonIds;

    const updatedLessons = await Promise.all(lessons.map(async (lesson) => {
      const lessonId = lesson._id.toString();
      const watch = await Watch.findOne({ lesson: lessonId, module: moduleId, user: loggedInUser.id });

      if (watch?.state === 'completed') {
        lesson.state = 'completed';
      }
      return lesson;
    }))
    return module;
  }));

  const quizSet = course?.quizSet;
  const isQuizComplete = report?.quizAssessment ? true : false;

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold text-center">{course?.title}</h1>
          <div className="mt-10">
            <CourseProgress variant="success" value={totalProgress} />
          </div>
        </div>
        <SidebarModules courseId={courseId} modules={updatedModules} />
        <div className="w-full px-4 lg:px-14 pt-10 border-t">
          {quizSet && <Quiz
            courseId={courseId}
            quizSet={quizSet}
            isTaken={isQuizComplete}
          />}
        </div>
        <div className="w-full px-6">
          <DownloadCertificate courseTitle={course?.title} courseId={courseId} totalProgress={totalProgress} />
          <GiveReview
            courseId={courseId}
            loggedInUserId={loggedInUserId}
            testimonial={testimonial}
          />
        </div>
      </div>
    </>
  );
};