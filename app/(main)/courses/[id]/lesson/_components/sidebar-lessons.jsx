import {
    AccordionContent,
} from "@/components/ui/accordion";
import SidebarLessonsItems from "./sidebar-lessons-items";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SidebarLessons = ({ courseId, lessons, singleModule }) => {
    const allLessons = replaceMongoIdInArray(lessons).toSorted(
        (a, b) => a.order - b.order
    )

    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
                {
                    allLessons.map(lesson => <SidebarLessonsItems
                        key={lesson.id}
                        courseId={courseId}
                        lesson={lesson}
                        singleModule={singleModule}
                    />)
                }
            </div>
        </AccordionContent>
    );
};

export default SidebarLessons;