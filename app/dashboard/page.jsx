import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import { EnrollmentPieChart } from "./_components/pie-chart";
import { IconBadge } from "@/components/icon-badge";
import {
  BookOpenCheck,
  CircleDollarSign
} from "lucide-react";
import { EnrollmentDateBarChart } from "./_components/bar-chart";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const instructor = await getUserByEmail(session.user.email);
  if (instructor?.role !== "instructor") redirect("/login");
  const courseStats = await getCourseDetailsByInstructor(instructor?.id);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="flex items-center justify-center flex-col">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl">Total Courses</h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseStats?.courses}</div>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center flex-col">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Total Revenue</h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(courseStats?.revenue)}</div>
          </CardContent>
        </Card>
      </div>
      <EnrollmentPieChart courseStats={courseStats?.courseWiseEnrollments} />
      <EnrollmentDateBarChart dateWiseEnrollments={courseStats?.dateWiseEnrollments} />
    </div>
  );
};

export default DashboardPage;
