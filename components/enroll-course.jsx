"use client"

import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/app/actions/stripe";

const EnrollCourse = ({ asLink, courseId }) => {
    const formAction = async (data) => {
        const { url } = await createCheckoutSession(data);
        window.location.assign(url);
    }

    return (
        <form
            action={formAction}
        >
            <input type="hidden" name="courseId" value={courseId} />
            {
                asLink ?
                    <Button
                        type="submit"
                        variant="ghost"
                        className="text-xs btn-primary h-7 gap-1"
                    >
                        Enroll
                        <ArrowRight className="w-3" />
                    </Button>
                    : <Button
                        type="submit"
                        className={cn(buttonVariants({ size: "lg" }))}
                    >
                        Enroll Now
                    </Button>
            }
        </form>
    );
};

export default EnrollCourse;