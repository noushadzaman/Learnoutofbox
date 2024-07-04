"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changeCoursePublishState, deleteCourse } from "@/app/actions/course";

export const CourseActions = ({ courseId, isActive }) => {
  const router = useRouter()
  const [action, setAction] = useState(null);
  const [isPublished, setIsPublished] = useState(isActive);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      switch (action) {
        case "change-active":
          const activeState = await changeCoursePublishState(courseId);
          setIsPublished(!activeState);
          toast.success("The course has been updated");
          router.refresh();
          break;
        case "delete":
          if (isPublished) {
            toast.error("A published course can not be deleted. First hide it, then delete.");
          }
          else {
            await deleteCourse(courseId);
            toast.success("The course has been deleted");
            router.push(`/dashboard/courses`);
            router.refresh();
          }
          break;

        default: {
          throw new Error("invalid course action");
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
