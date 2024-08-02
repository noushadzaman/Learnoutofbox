import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { REVIEW_DATA, getInstructorDashboardData } from "@/lib/dashboard-helper";
import { auth } from "@/auth";

const ReviewsPage = async ({ params: { courseId } }) => {
  const session = await auth();
  const course = await getCourseDetails(courseId);
  const reviewData = await getInstructorDashboardData(session?.user?.email, REVIEW_DATA);
  const reviewDataForCourse = reviewData.filter(r => r?.courseId.toString() === courseId);

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={reviewDataForCourse} />
    </div>
  );
};

export default ReviewsPage;
