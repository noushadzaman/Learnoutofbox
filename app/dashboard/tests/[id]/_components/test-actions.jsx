"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changeTestPublishState, deleteTest } from "@/app/actions/test";

export const TestActions = ({ testId, isActive }) => {
    const router = useRouter()
    const [action, setAction] = useState(null);
    const [isPublished, setIsPublished] = useState(isActive);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            switch (action) {
                case "change-active":
                    const activeState = await changeTestPublishState(testId);
                    setIsPublished(!activeState);
                    toast.success("The test has been updated");
                    router.refresh();
                    break;
                case "delete":
                    if (isPublished) {
                        toast.error("A published test can not be deleted. First hide it, then delete.");
                    }
                    else {
                        await deleteTest(testId);
                        toast.success("The test has been deleted");
                        router.push(`/dashboard/tests`);
                        router.refresh();
                    }
                    break;

                default: {
                    throw new Error("invalid test action");
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
