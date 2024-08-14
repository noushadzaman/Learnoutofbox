import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDemoVideos, getCourseDetails } from "@/queries/courses";
import { getTestimonialsForCourse } from "@/queries/testimonials";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);
  const testimonials = await getTestimonialsForCourse(id);
  const demoVideos = await getCourseDemoVideos(id);
  console.log(testimonials);
  

  return (
    <>
      <CourseDetailsIntro course={course} demoVideos={demoVideos} />
      <CourseDetails course={course} />
      {testimonials?.length > 0 && <Testimonials testimonials={testimonials} />}
      {/* <RelatedCourses /> */}
    </>
  );
};
export default SingleCoursePage;