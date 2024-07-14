import { auth } from "@/auth";
import { getInstructorDashboardData, COURSE_DATA } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const session = await auth();
  const courses = await getInstructorDashboardData(session?.user?.email, COURSE_DATA);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
