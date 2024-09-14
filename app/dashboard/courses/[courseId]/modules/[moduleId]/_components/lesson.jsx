import { ArrowLeft, Eye, LayoutDashboard, Video, View } from "lucide-react";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { LessonsActions } from "./lesson-action";
import { LessonTitleForm } from "./lesson-title-form";
import { LessonDescriptionForm } from "./lesson-description-form";
import { LessonAccessForm } from "./lesson-access-form";
import { AccessAsDemoForm } from "./access-demo-form";
import { VideoUrlForm } from "./video-url-form";


const Lesson = ({ courseId, moduleId, lesson }) => {

    return (
        <div>
            <div className="px-3 py-5">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <div className="flex items-center justify-end">
                            <LessonsActions
                                lesson={lesson}
                                moduleId={moduleId}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className="text-xl">Customize Your chapter</h2>
                            </div>
                            <LessonTitleForm
                                initialData={{ title: lesson?.title }}
                                courseId={courseId}
                                lessonId={lesson?.id}
                            />
                            <LessonDescriptionForm
                                initialData={{ description: lesson?.description }}
                                courseId={courseId}
                                lessonId={lesson?.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Eye} />
                                <h2 className="text-xl">Access Settings</h2>
                            </div>
                            <LessonAccessForm
                                initialData={{ isFree: lesson?.access !== "private" }}
                                courseId={courseId}
                                lessonId={lesson?.id}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-5">
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={View} />
                                <h2 className="text-xl">Access as demo</h2>
                            </div>
                            <AccessAsDemoForm
                                initialData={{ isDemo: lesson?.isDemo }}
                                courseId={courseId}
                                lessonId={lesson?.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Video} />
                                <h2 className="text-xl">Add a video</h2>
                            </div>
                            <VideoUrlForm
                                initialData={{
                                    url: lesson?.video_url,
                                    duration: lesson?.duration
                                }}
                                courseId={courseId}
                                lessonId={lesson?.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lesson;