import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as z from "zod";
// import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { doCreateReview } from "@/app/actions/testimonials";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

const formSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, {
      message: "Rating can be 1 to 5",
    })
    .max(5, {
      message: "Rating can be 1 to 5",
    }),
  content: z.string().min(1, {
    message: "Review message is required!",
  }),
});
export const ReviewModal = ({ courseId, loggedInUserId, open, setOpen, testimonial }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: testimonial.length > 0 ? testimonial[0].rating : 0,
      content: testimonial.length > 0 ? testimonial[0].content : '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data) => {
    try {
      const newReview = {
        courseId,
        user: loggedInUserId,
        rating: data.rating,
        content: data.content,
      }
      console.log(newReview);

      await doCreateReview(newReview);

      toast.success("Review added");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  function stateChange(e, state) {
    setTestimonialState({
      ...testimonialState,
      [state]: e.target.value
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        className="overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle>
          Testimonials
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            {/* rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Rating</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 5"
                      {...field}
                      type="number"
                      min={1}
                      max={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* review */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Course review"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a brief overview about the course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button variant="outline" type="button">
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
