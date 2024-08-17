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
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { deleteTestQuestion, updateTestQuestion } from "@/app/actions/test";
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

export const QAForm = ({ initialData = {}, testId, testSetId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });
    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            await updateTestQuestion(testId, { ...initialData, ...values });
            toggleEdit();
            router.refresh();
            toast.success("Test has been updated");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const deleteQuestion = async () => {
        try {
            await deleteTestQuestion(testSetId, testId);
            router.refresh();
            toast.success("Test has been deleted");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Question {initialData.id}:
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Question set
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-sm mt-2">Q: {initialData.question}</p>
                        <p className="text-sm mt-2">A: {initialData.answer}</p>
                        <p className="text-sm mt-2">Topic: {initialData.topic}</p>
                        <p className="text-sm mt-2">Difficulty: {initialData.difficulty}</p>
                    </div>
                    <Button variant="ghost" onClick={deleteQuestion}>
                        <Trash size={16} className="mr-2" /> Delete Question
                    </Button>
                </div>
            }
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
                                            defaultValue={initialData.question}
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
                                            defaultValue={initialData.answer}
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
                                            defaultValue={initialData?.topic}
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
                                            defaultValue={initialData?.difficulty}
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