import Image from "next/image";
import { Button } from "../ui/button";
import Brain from '../../public/assets/brain-logo.png';
import TestLogo from '../../public/test-logo.png';
import Certificate from '../../public/certificate-logo.png';
import Introductions from "./introductions";
import Link from "next/link";
import ShapeDiv from "./ShapeDiv";

const Features = () => {
    return (
        <section className="bg-[#fef8f8] py-[100px]">
            <div className="max-w-[1300px] mx-auto">
                <Introductions
                    key={1}
                    title={'EDUCATION FOR EVERYONE'}
                    subtitle={'Online Coaching Lessons For Remote Learning'}
                    description={"Learn from anywhere with our expert-led online courses, designed to make quality education accessible to all. Join a global community of learners and advance your knowledge from the comfort of your home."}
                    size={'half'}
                    align={'center'}
                />
                <div className="flex justify-center items-center gap-[25px] flex-col md:flex-row pt-[55px]">
                    <div className="bg-[#ffffff] flex flex-col gap-[16px] justify-center items-start px-[35px] py-[40px] rounded-[5px] w-[400px] hover:scale-110 ease-linear duration-100 h-[320px]  border-gray-200 border hover:border-gray-400 shadow-[#e1ecfe] shadow-lg">
                        <Image
                            className="h-[60px] w-[60px]"
                            src={Brain}
                            alt=""
                            height={500}
                            width={500}
                        />
                        <h3 className="font-[800] text-[22px] text-[#00030e] ">Learn from Industry Experts</h3>
                        <p className="text-[16px] text-[#606060]">Gain practical insights directly from top professionals in the field.</p>
                        <Link
                            href={`/courses`}
                        >
                            <Button
                                type="submit"
                                variant="secondary"
                                className="text-sm text-[#ff4955] h-7 gap-1"
                            >
                                Start Now!
                            </Button>
                        </Link>
                    </div>
                    <div className="bg-[#ffffff] flex flex-col gap-[16px] justify-center items-start px-[35px] py-[40px] rounded-[5px] w-[400px] hover:scale-110 ease-linear duration-100 h-[320px]  border-gray-200 border hover:border-gray-400 shadow-[#e1ecfe] shadow-lg">
                        <Image
                            className="h-[60px] w-[60px]"
                            src={TestLogo}
                            alt=""
                            height={500}
                            width={500}
                        />
                        <h3 className="font-[800] text-[22px] text-[#00030e] ">Test your skills like a pro</h3>
                        <p className="text-[16px] text-[#606060]">Challenge yourself with real-world scenarios to sharpen your expertise.</p>

                        <Link
                            href={`/questions`}
                        >
                            <Button
                                type="submit"
                                variant="secondary"
                                className="text-sm text-[#ff4955] h-7 gap-1">
                                Start Now!
                            </Button>
                        </Link>
                    </div>
                    <div className="bg-[#ffffff] flex flex-col gap-[16px] justify-center items-start px-[35px] py-[40px] rounded-[5px] w-[400px] hover:scale-110 ease-linear duration-100 h-[320px]  border-gray-200 border hover:border-gray-400 shadow-[#e1ecfe] shadow-lg">
                        <Image
                            className="h-[60px] w-[60px]"
                            src={Certificate}
                            alt=""
                            height={500}
                            width={500}
                        />
                        <h3 className="font-[800] text-[22px] text-[#00030e]">Get certification</h3>
                        <p className="text-[16px] text-[#606060]">Earn recognized credentials that validate your skills and enhance your career prospects.</p>
                        <Link
                            href={`/courses`}
                        >
                            <Button
                                type="submit"
                                variant="secondary"
                                className="text-sm text-[#ff4955] h-7 gap-1"
                            >
                                Start Now!
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;