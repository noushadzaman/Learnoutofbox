import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-[#ffd9d9]",
                success: "bg-[#ffd9d9]",
            },
            size: {
                default: "p-2",
                sm: "p-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const iconVariants = cva("", {
    variants: {
        variant: {
            default: "text-[#ff4956]",
            success: "text-[#ff4956]",
        },
        size: {
            default: "h-8 w-8",
            sm: "h-4 w-4",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export const IconBadge = ({ icon: Icon, variant, size }) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    );
};