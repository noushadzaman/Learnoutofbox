import { BookCheck } from "lucide-react";
import { Clock10 } from "lucide-react";
import {
    Accordion,
} from "@/components/ui/accordion";
import CourseModuleList from "./module/CourseModuleList";

const CourseCurriculum = ({ course }) => {
    const totalDuration = course?.modules.map(item => {
        return item.lessonIds.reduce(function (acc, obj) {
            return acc + obj.duration;
        }, 0)
    }).reduce(function (acc, obj) {
        return acc + obj;
    }, 0);
    const orderedCourse = course?.modules.sort((a, b) => a.order - b.order);

    return (
        <>
            <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {course?.modules?.length} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    {(totalDuration / 3660).toFixed(2)} Hours
                </span>
            </div>
            <Accordion
                defaultValue={[]}
                type="single"
                collapsible
                className="w-full"
            >
                {
                    orderedCourse && orderedCourse.map(module => <CourseModuleList
                        key={module._id}
                        module={module}
                    />)
                }
            </Accordion>
        </>
    );
};

export default CourseCurriculum;