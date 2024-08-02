"use client";

import * as z from "zod";
// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/course";
import { toast } from "sonner";


export const LearningForm = ({ initialData = {}, courseId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [learnings, setLearnings] = useState(initialData?.learning);
    const learnSchema = {};
    for (let i = 1; i <= learnings.length; i++) {
        learnSchema[`learning${i}`] = z.string().min(1, {
            message: `learning${i} is required`,
        });
    }
    const formSchema = z.object(learnSchema);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            const learning = Object.values(values);
            setLearnings(learning)
            await updateCourse(courseId, { learning });
            toggleEdit();
            router.refresh();
            toast.success("Course title has been updated");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const addLearning = () => {
        setLearnings([
            ...learnings,
            ''
        ])
    }

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Learnings
                <Button variant="ghost" onClick={addLearning}>
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Add Learning
                </Button>
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit learnings
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                <>
                    <p className="text-sm mt-2">{initialData.title}</p>
                    {
                        learnings.map((l, idx) =>
                            <p
                                key={idx}
                                className="text-sm mt-2"
                            >● {l}</p>
                        )
                    }
                </>
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            {
                                learnings.map((l, idx) =>
                                    <FormField
                                        key={idx}
                                        control={form.control}
                                        name={`learning${idx + 1}`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="e.g. 'Advanced web development'"
                                                        {...field}
                                                        defaultValue={l}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                            <div className="flex items-center gap-x-2">
                                <Button disabled={isSubmitting} type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }
        </div >
    );
};
