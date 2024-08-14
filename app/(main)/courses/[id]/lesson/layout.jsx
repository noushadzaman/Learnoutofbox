import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { redirect } from "next/navigation";
import { hasEnrollmentForCourse } from "@/queries/enrollment";

const CourseLayout = async ({ children, params: { id } }) => {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) {
    redirect("/login");
  }

  const isEnrolled = await hasEnrollmentForCourse(id, loggedInUser?.id);
  if (!isEnrolled) {
    redirect(`/courses/${id}`)
  }

  return (
    <>
      <div className="h-[80px] fixed inset-y-0 w-full z-0 top-[60px]">
        <div className="p-4 border-b lg:hidden h-full flex items-center bg-white shadow-sm relative">
          {/* Course Sidebar For Mobile */}
          <CourseSidebarMobile courseId={id} loggedInUserId={loggedInUser?.id}/>
          {/* <NavbarRoutes /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 mx-auto xl:min-w-[1300px]">
        <main className="w-full pt-[80px] lg:pt-[20px] col-span-9 xl:col-span-9 h-full">{children}</main>
        <div className="hidden lg:flex h-full w-full col-span-3 xl:col-span-3 flex-col inset-y-0 z-50">
          {/* sidebar starts */}
          <CourseSidebar courseId={id} loggedInUserId={loggedInUser?.id} />
          {/* sidebar ends */}
        </div>
      </div>
    </>
  );
};
export default CourseLayout;
