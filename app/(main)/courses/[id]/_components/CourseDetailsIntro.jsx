import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EnrollCourse from "@/components/enroll-course";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { hasEnrollmentForCourse } from "@/queries/enrollment";

const CourseDetailsIntro = async ({ course }) => {
    const { title, subtitle, thumbnail } = course;
    const session = await auth();
    const loggedInUser = await getUserByEmail(session?.user?.email);
    const hasEnrollment = await hasEnrollmentForCourse(course?.id, loggedInUser?.id)

    return (
        <div className="overflow-x-hidden  grainy">
            <section className="pt-12  sm:pt-16">
                <div className="container">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h1 className="px-6 text-lg text-gray-600 font-inter">
                                {subtitle}
                            </h1>
                            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                                <span className="relative inline-flex sm:inline">
                                    <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                                    <span className="relative">{title} </span>
                                </span>
                            </p>

                            <div className="mt-6 flex items-center justify-center flex-wrap gap-3">
                                {
                                    hasEnrollment
                                        ? <Link href={`/courses/${course?.id}/lesson`}
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "lg" })
                                            )}
                                        >Access course</Link>
                                        : <EnrollCourse loggedInUser={loggedInUser} courseId={course?.id} />
                                }
                                <Link
                                    href=""
                                    className={cn(
                                        buttonVariants({ variant: "outline", size: "lg" })
                                    )}
                                >
                                    See Intro
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pb-12  mt-6">
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
                </div>
            </section>
        </div>
    );
};

export default CourseDetailsIntro;