import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import { getCourseCount, getCourseList } from "@/queries/courses";
import CourseCard from "./_components/CourseCard";
import { CoursePagination } from "./_components/pagination";
import SortCategories from "./_components/sort-categories";
import { getCategories } from "@/queries/categories";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

const CoursesPage = async ({ searchParams: { categoryId, page, course, price } }) => {
  const count = await getCourseCount(categoryId);
  const categories = await getCategories();
  const courses = await getCourseList(categoryId, page, course, price);
  const session = await auth();
  const loggedInUser = await getUserByEmail(session?.user?.email);

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
        <SortCategories categories={categories} />
      </div>
      <CoursePagination count={count} defaultPage={page} />
      <section className="pb-24 pt-6 max-w-[1200px] mx-auto">
        <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 justify-items-center">
          {courses.map((course) => {
            return (
              <CourseCard key={course.id} course={course} loggedInUser={loggedInUser} />
            );
          })}
        </div>
      </section>
      <CoursePagination count={count} defaultPage={page} />
    </section>
  );
};
export default CoursesPage;

