import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EnrollCourse from "@/components/enroll-course";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { hasEnrollmentForCourse } from "@/queries/enrollment";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import Demos from "./demos";
import { SquarePlay } from "lucide-react";

const CourseDetailsIntro = async ({ course, demoVideos }) => {
    const { title, subtitle, thumbnail } = course;
    const session = await auth();
    const loggedInUser = await getUserByEmail(session?.user?.email);
    const hasEnrollment = await hasEnrollmentForCourse(course?.id, loggedInUser?.id);

    return (
        <div className="overflow-x-hidden  grainy">
            <section className="pt-12  sm:pt-16">
                <div className="container">
                    <div className="pb-12 mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 h-2/3"></div>
                            <div className="relative mx-auto">
                                <div className="lg:max-w-3xl lg:mx-auto">
                                    <Image
                                        className="w-full rounded-lg"
                                        width={768}
                                        height={463}
                                        src={`${thumbnail}`}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="flex items-center justify-center flex-wrap gap-3">
                                {
                                    hasEnrollment
                                        ? <Link href={`/courses/${course?.id}/lesson`}
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "lg" })
                                            )}
                                        >Access course</Link>
                                        : <EnrollCourse loggedInUser={loggedInUser} courseId={course?.id} />
                                }
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "lg" })
                                            )}
                                            variant="outline">
                                            <SquarePlay className="mr-2" />
                                            See demo videos</Button>
                                    </DialogTrigger>
                                    <Demos demoVideos={demoVideos} />
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseDetailsIntro;