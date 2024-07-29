import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import { getCourseList } from "@/queries/courses";
import CourseCard from "./_components/CourseCard";

const CoursesPage = async ({ searchParams: { course, price } }) => {
  const courses = await getCourseList(course, price);

  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      <div className="border-b border-gray-200 pb-6">
        <SearchCourse />
      </div>
      <div className="flex items-center justify-end gap-2 max-lg:w-full">
        <SortCourse />
      </div>
      <section className="pb-24 pt-6 max-w-[1200px] mx-auto">
        <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 justify-items-center">
          {courses.map((course) => {
            return (
              <CourseCard key={course.id} course={course} />
            );
          })}
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;

