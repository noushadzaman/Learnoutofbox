import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ENROLLMENT_DATA, getInstructorDashboardData } from "@/lib/dashboard-helper";
import { auth } from "@/auth";

const EnrollmentsPage = async ({ params: { courseId } }) => {
  const session = await auth();
  const course = await getCourseDetails(courseId);
  const allEnrollments = await getInstructorDashboardData(session?.user?.email, ENROLLMENT_DATA);
  const enrollmentForCourse = allEnrollments.filter(e => e?.course.toString() == courseId);

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentForCourse} />
    </div>
  );
};

export default EnrollmentsPage;