import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Introductions from './introductions';
import {
    AlarmClockCheck,
    LaptopMinimal,
    User,
    MoveUpRight,
} from "lucide-react";
import BannerImgTwo from "../../public/banner-two.png";
import BannerImgThree from "../../public/banner-three.png";


const BannerTwo = ({ title, subtitle, btn }) => {
    return (
        <section className='bg-[#fafbff]'>
            <div className={`md:flex  justify-center items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 max-w-[1300px] mx-auto`}>
                <Image
                    className="max-w-full max-h-[600px] mx-auto"
                    src={BannerImgTwo}
                    alt={"banner-img"}
                    width={600}
                    height={600}
                />
                <div className="flex md:max-w-[50%] md:pl-[80px] lg:pl-[110px] xl:pl-[180px]  xxl:pl-[250px] md:items-start flex-col gap-4">
                    <Introductions
                        title={"DISTANCE LEARNING"}
                        subtitle={ "Develop Your Skills, Learn Something New, and Grow Your Skills From Anywhere in the World!"}
                        description={ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        align={'left'}
                        size={'full'}
                    />
                    <div className="py-[15px] w-[100%] flex flex-col text-[18px] gap-[15px]">
                        <div className="flex items-center justify-between w-[90%]">
                            <div className="flex items-center gap-[10px]">
                                <User className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600]">Expert Instructors</p>
                            </div>
                            <div className="flex items-center gap-[10px] text-[18px]">
                                <LaptopMinimal className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600]">Remote Learning</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-[90%]">
                            <div className="flex items-center gap-[10px] text-[18px]">
                                <AlarmClockCheck className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600]">Lifetime Access</p>
                            </div>
                            <div className="flex items-center gap-[10px] text-[18px]">
                                <MoveUpRight className="text-[#fe4a55]" />
                                <p className="text-[#00030e] font-[600]">Self Development</p>
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