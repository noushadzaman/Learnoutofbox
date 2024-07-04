"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { changeLessonPublishState, deleteLesson } from "@/app/actions/lesson";
import { toast } from "sonner";

export const LessonsActions = ({ lesson, moduleId, onDelete }) => {
    const [action, setAction] = useState(null);
    const [isPublished, setIsPublished] = useState(lesson?.active);
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            switch (action) {
                case "change-active":
                    const activeState = await changeLessonPublishState(lesson.id);
                    setIsPublished(!activeState);
                    toast.success("The lesson has been updated");
                    break;
                case "delete":
                    if (isPublished) {
                        toast.error("A published lesson can not be deleted. First hide it, then delete.");
                    }
                    else {
                        await deleteLesson(lesson.id, moduleId);
                        onDelete();
                        toast.success("The lesson has been deleted");
                    }
                    break;

                default: {
                    throw new Error("invalid lesson action");
                }
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-2">
                <Button
                    onClick={() => setAction("change-active")}
                    variant="outline"
                    size="sm"
                >
                    {isPublished ? "hide" : "Publish"}
                </Button>

                <Button
                    onClick={() => setAction("delete")}
                    size="sm"
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
