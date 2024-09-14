import { getLesson } from "@/queries/lesson";
import Lesson from "../../_components/lesson";
import { ArrowLeft, } from "lucide-react";
import Link from "next/link";

const LessonPage = async ({ params: { courseId, moduleId, lessonId } }) => {
    const lesson = await getLesson(lessonId)

    return (
        <div className="">
            <Link
                href={`/dashboard/courses/${courseId}/modules/${moduleId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6 mx-4 mt-5"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to module setup
            </Link>
            <Lesson
                courseId={courseId}
                moduleId={moduleId}
                lesson={lesson}
            />
        </div>
    );
};

export default LessonPage;