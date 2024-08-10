import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs",
};

export const CourseProgress = ({ value, variant, size }) => {
    return (
        <div>
            <Progress
                value={value}
                variant={variant}
                className={cn("h-2", !variant && "text-[#f58e87]")}
            />
            <p
                className={cn(
                    "font-medium mt-2 text-[#f58e87]",
                    sizeByVariant[size || "default"]
                )}
            >
                {Math.round(value)}% Complete
            </p>
        </div>
    );
};