'use client';

import { motion } from 'framer-motion'
import WelcomeSpan from './welcome-span';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import BannerBox from './BannerBox';

const Banner = () => {

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1
                }
            }}
            viewport={{ once: true }}
        >
            <section className="md:flex justify-center items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 md:min-h-[calc(100vh-80px)]">
                <div className="flex md:max-w-[50%] md:pl-[80px] lg:pl-[110px] xl:pl-[180px] xxl:pl-[250px] items-center md:items-start flex-col gap-4 text-center relative isolate">
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
                    <motion.div
                        className='flex flex-col gap-4 items-center md:items-start justify-center w-[100%]'
                        initial={{ opacity: 0.7, scale: 0.8 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                ease: "easeInOut",
                                duration: 1
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        <WelcomeSpan />
                        <h1 className="font-heading text-center md:text-left text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                            Empower Your Future, Educate Today.
                        </h1>
                        <p className="max-w-[42rem] text-center md:text-left leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            Empower Your Future with Comprehensive Learning: Courses, Quizzes,
                            and Roadmaps for Success.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
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
                    </motion.div>
                </div>
                <BannerBox />
            </section>
        </motion.div >

    );
};

export default Banner;