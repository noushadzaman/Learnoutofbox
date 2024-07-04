"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changeModulePublishState, deleteModule } from "@/app/actions/module";

export const ModuleActions = ({ courseId, singleModule }) => {
    const router = useRouter()
    const [action, setAction] = useState(null);
    const [isPublished, setIsPublished] = useState(singleModule?.active);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            switch (action) {
                case "change-active":
                    const activeState = await changeModulePublishState(singleModule.id);
                    setIsPublished(!activeState);
                    toast.success("The module has been updated");
                    router.refresh();
                    break;
                case "delete":
                    if (isPublished) {
                        toast.error("A published module can not be deleted. First hide it, then delete.");
                    }
                    else {
                        await deleteModule(singleModule.id, courseId);
                        router.push(`/dashboard/courses/${courseId}`);
                        toast.success("The module has been deleted");
                    }
                    break;

                default: {
                    throw new Error("invalid module action");
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
