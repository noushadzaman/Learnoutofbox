import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    AlarmClockCheck,
    LaptopMinimal,
    User,
    MoveUpRight,
} from "lucide-react";

import BannerBrain from './BannerBrain';


const BannerTwo = () => {
    return (
        <section className='bg-[#fafbff] px-[40px]'>
            <div className={`md:flex justify-center items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 max-w-[1300px] mx-auto`}>
                <div
                    className="max-w-[40%]"
                >
                    <BannerBrain />
                </div>
                <div className="flex md:max-w-[60%] md:pl-[80px] lg:pl-[110px] xl:pl-[180px]  xxl:pl-[250px] md:items-start flex-col gap-4">
                    <div
                        className={`flex items-left justify-center flex-col text-left`}
                    >
                        <p
                            className="text-[#ff4955] font-[600] text-[14px]"
                        >DISTANCE LEARNING</p>
                        <p
                            className="text-[#00030e] font-[800] text-[36px] my-[5px] leading-[43px]"
                        >Develop new skills and grow from anywhere in the world!</p>
                        <p
                            className="text-[#606060] text-[16px] leading-[25px]"
                        >Unlock your potential with our flexible distance learning platform. Enhance your skills, explore new knowledge, and advance your career at your own pace, from anywhere. With practical courses and expert guidance, achieve your goals without the limits of traditional classrooms. Start your journey to success today.</p>
                    </div >
                    <div className="py-[15px] w-[100%] flex flex-col text-[18px] gap-[15px]">
                        <div className="flex items-center justify-between md:justify-start lg:w-[90%] mx-auto gap-3">
                            <div className="flex items-center gap-[10px] md:text-[18px] text-[16px]">
                                <User className="text-[#fe4a55] md:text-[18px] text-[16px]" />
                                <p className="text-[#00030e] font-[600] shrink-0">Expert Instructors</p>
                            </div>
                            <div className="flex items-center gap-[10px] md:text-[18px] text-[16px]">
                                <LaptopMinimal className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600] shrink-0">Remote Learning</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-start lg:w-[90%] mx-auto gap-3">
                            <div className="flex items-center gap-[10px] md:text-[18px] text-[16px]">
                                <AlarmClockCheck className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600] shrink-0">Lifetime Access</p>
                            </div>
                            <div className="flex items-center gap-[10px] md:text-[18px] text-[16px]">
                                <MoveUpRight className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600] shrink-0">Self Development</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        <Link
                            href="/courses"
                            className={cn(buttonVariants({ size: "lg" }))}
                        >
                            View all courses
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerTwo;