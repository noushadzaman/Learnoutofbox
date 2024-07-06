import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollment";
import { getUserByEmail } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
    if (!session_id) {
        throw new Error("Please provide a new session id that starts with cs_")
    }
    const userSession = await auth();
    if (!userSession?.user?.email) {
        redirect("/login");
    }
    //! course info
    const course = await getCourseDetails(courseId);
    const productName = course?.title;
    const instructorName =
        `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;
    //! course info

    //! customer info
    const loggedInUser = await getUserByEmail(userSession?.user?.email);
    const customerName =
        `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
    const customerEmail = loggedInUser?.email;
    //! customer info

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"]
    })
    const paymentStatus = checkoutSession?.payment_intent?.status;

    if (paymentStatus === "succeeded") {
        // update DB enrollment collection
        await enrollForCourse(course?.id, loggedInUser?.id, "stripe");
        // send emails to the instructor, student and the person who paid
        const emailsToSend = [
            {
                to: instructorEmail,
                subject: `New enrollment for ${productName}`,
                message: `Congratulations, ${instructorName}. A new student, ${customerName} has been enrolled to your course "${productName}" just now.
                Please check the instructor dashboard and give a high-five to your new student.`
            },
            {
                to: customerEmail,
                subject: `Enrollment success for ${productName}`,
                message: `Congratulations, ${customerName} you have successfully enrolled for "${productName}" course.`
            }
        ]
        const emailSentResponse = await sendEmails(emailsToSend);
    }

    return (
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
                {
                    paymentStatus === "succeeded" && <>
                        <CircleCheck className="w-32 h-32 bg-[#90d790] rounded-full p-0  text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl">
                            Congratulations! <strong>{customerName}</strong> Your Enrollment was Successful for <strong>{productName}</strong>
                        </h1>
                    </>
                }
                <div className="flex items-center gap-3">
                    <Button asChild size="sm">
                        <Link href="/courses">Browse Courses</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/courses/${courseId}/lesson`}>Play Course</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Success;