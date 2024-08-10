import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";

const SidebarLessonsItems = ({ courseId, lesson, singleModule }) => {
    const isPrivate = (lesson) => {
        return lesson?.access === 'private';
    };
    const isCompleted = (lesson) => {
        return lesson?.state === 'completed';
    };
    
    return (
        <>
            <Link
                href={
                    isPrivate(lesson) ?
                        `#` :
                        `/courses/${courseId}/lesson?name=${lesson.slug}&module=${singleModule}`
                }
                className={cn(
                    "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
                    isPrivate(lesson) && "text-[#100f1f]",
                    isCompleted(lesson) && "text-[#f58e87] hover:text-[#fe4a54]"
                )}
            >
                <div className="flex items-center gap-x-2">
                    {
                        isPrivate(lesson) ?
                            <Lock
                                size={18}
                                className={cn("text-[#100f1f] shrink-0")}
                            />
                            : isCompleted(lesson) ?
                                <CheckCircle
                                    size={18}
                                    className={cn("text-[#f58e87] shrink-0")}
                                />
                                : <PlayCircle size={18}
                                    className={cn("text-[#f58e87] shrink-0")} />
                    }
                    {lesson?.title}
                </div>
            </Link>
        </>

    );
};

export default SidebarLessonsItems;