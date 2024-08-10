import { CourseProgress } from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import { getCategoryDetails } from "@/queries/categories";
import { getCourseDetails } from "@/queries/courses";
import { getReport } from "@/queries/reports";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const EnrolledCourseCard = async ({ enrollment }) => {
    const courseCategory = await getCategoryDetails(enrollment?.course?.category?._id);

    const filter = {
        course: enrollment?.course?._id,
        student: enrollment?.student?._id
    };
    const report = await getReport(filter);
    // Get total module number
    const courseDetails = await getCourseDetails(enrollment?.course?._id);
    const totalModuleCount = courseDetails?.modules?.length;

    // Total completed modules
    const totalCompletedModules = report?.totalCompletedModules ? report?.totalCompletedModules?.length : 0;

    // Total progress  
    const totalProgress = totalModuleCount ? (totalCompletedModules / totalModuleCount) * 100 : 0;

    // Get all quizzes and assignments 
    const quizzes = report?.quizAssessment?.assessments;
    const totalQuizzes = quizzes?.length ?? 0;

    const quizzesTaken = quizzes ? quizzes.filter(q => q.attempted) : [];

    const totalCorrect = quizzesTaken.map(q => {
        const item = q?.options;
        return item.filter(i => {
            return i.isCorrect === true && i.isSelected === true;
        })
    }).filter(e => e.length > 0).flat();

    const marksFromQuizzes = totalCorrect?.length * 5;
    const otherMarks = report?.quizAssessment?.otherMarks ?? 0;
    const totalMarks = marksFromQuizzes + otherMarks;
    
    return (
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full border-gray-200 px-[20px] py-[20px] cursor-pointer hover:scale-105 ease-linear duration-100 hover:border-gray-400 shadow-[#e1ecfe] shadow-lg ">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                    src={`${enrollment?.course?.thumbnail}`}
                    alt={enrollment?.course?.title}
                    className="object-cover"
                    fill
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-[#f58e87] line-clamp-2">
                    {enrollment?.course?.title}
                </div>
                <p className="text-xs text-muted-foreground">{courseCategory?.title}</p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <div>
                            <BookOpen className="w-4" />
                        </div>
                        <span>{enrollment?.course?.modules?.length} Chapters</span>
                    </div>
                </div>
                <div className=" border-b pb-2 mb-2">
                    <div className="flex items-center justify-between">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Total Modules: {enrollment?.course?.modules?.length}
                        </p>
                        <div className="text-md md:text-sm font-medium text-slate-700">
                            Completed Modules <Badge variant="success">{totalCompletedModules}</Badge>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Total Quizzes: {totalQuizzes}
                        </p>
                        <div className="text-md md:text-sm font-medium text-slate-700">
                            Quiz taken <Badge variant="success">{quizzesTaken.length}</Badge>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Mark from Quizzes
                        </p>

                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {marksFromQuizzes}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Others
                        </p>

                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {otherMarks}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-md md:text-sm font-medium text-slate-700">
                        Total Marks
                    </p>

                    <p className="text-md md:text-sm font-medium text-slate-700">
                        {totalMarks}
                    </p>
                </div>

                <CourseProgress
                    size="sm"
                    value={totalProgress}
                    variant={""}
                />
            </div>
        </div>

    );
};

export default EnrolledCourseCard;