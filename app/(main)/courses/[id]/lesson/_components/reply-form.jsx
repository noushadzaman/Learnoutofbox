"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { replyComment } from "@/app/actions/comment";

const formSchema = z.object({
    reply: z.string().min(1, {
        message: "Reply is required",
    }),
});

const ReplyForm = ({ isEditing, setIsEditing, commentId, loggedInUserId, loggedInUser, setReplies }) => {
    const router = useRouter();
    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reply: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            const newReply = {
                commentId,
                loggedInUserId,
                content: values?.reply,
            }
            await replyComment(newReply);
            setReplies(replies => [...replies, {
                commentId,
                user: loggedInUser,
                content: values?.reply,
            }])
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };



    return (
        <div>
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="reply"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Your reply'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Reply
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default ReplyForm;