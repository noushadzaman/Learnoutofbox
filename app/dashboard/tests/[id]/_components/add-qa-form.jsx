"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { addTestQuestion } from "@/app/actions/test";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    question: z.string().min(1, {
        message: "Question is required",
    }),
    answer: z.string().min(1, {
        message: "Answer is required",
    }),
    topic: z.string().min(1, {
        message: "Answer is required",
    }),
    difficulty: z.string().min(1, {
        message: "Answer is required",
    }),
});

export const AddQAForm = ({ testId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            await addTestQuestion(testId, { ...values });
            toggleEdit();
            router.refresh();
            toast.success("Test has been updated");
            // form.reset();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4 w-full min-w-[50%]">
            <div className="font-medium flex items-center justify-between text-nowrap">
                Question :
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Add Question set
                        </>
                    )}
                </Button>
            </div>
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            className='min-h-[100px]'
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'How are you?'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            className='min-h-[200px]'
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Fine!!'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'topic'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'difficulty'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};