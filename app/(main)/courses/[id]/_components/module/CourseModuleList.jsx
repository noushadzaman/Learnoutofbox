import { Radio } from "lucide-react";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import CourseLessonList from "./CourseLessonList";

const CourseModuleList = ({ module }) => {
    const totalDuration = module?.lessonIds?.reduce(function (acc, obj) {
        return acc + obj.duration;
    }, 0);

    return (
        <div>
            <AccordionItem className="border-none" value={module?._id}>
                <AccordionTrigger>{module?.title}</AccordionTrigger>
                <AccordionContent>
                    {/* header */}
                    <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Video className="w-4 h-4" />
                            {(totalDuration / 3660).toFixed(2)}+ Hours
                        </span>
                    </div>
                    <div className="space-y-3">
                        {
                            module?.lessonIds.map(lessonId => <CourseLessonList
                                key={lessonId}
                                lessonId={lessonId}
                            />)
                        }
                    </div>
                </AccordionContent>
            </AccordionItem>
        </div>
    );
};

export default CourseModuleList;