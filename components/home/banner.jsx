import React from 'react';
import WelcomeSpan from './welcome-span';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import BannerImg from "../../public/main-banner-img.png";

const Banner = () => {
    return (
        <section className="md:flex justify-center items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 grainy">
            <div className="flex md:max-w-[50%] md:pl-[80px] lg:pl-[110px] xl:pl-[180px]  xxl:pl-[250px] items-center md:items-start flex-col gap-4 text-center relative isolate">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f68d89] to-[#9ab3db] opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <WelcomeSpan />
                <h1 className="font-heading text-center md:text-left text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                    Empower Your Future, Educate Today.
                </h1>
                <p className="max-w-[42rem] text-center md:text-left leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Empower Your Future with Comprehensive Learning: Courses, Quizzes,
                    and Roadmaps for Success.
                </p>
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    <Link
                        href="/courses"
                        className={cn(buttonVariants({ size: "lg" }))}
                    >
                        Explore Now
                    </Link>
                    <Link
                        href="/register/instructor"
                        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                    >
                        Become An Instructor
                    </Link>
                </div>
            </div>
            <Image
                className="w-[350px] h-[300px] mx-auto md:w-[600px] md:h-[500px] lg:w-[600px] lg:h-[500px]"
                src={BannerImg}
                alt={"banner-img"}
                width={600}
                height={600}
            />
        </section>
    );
};

export default Banner;