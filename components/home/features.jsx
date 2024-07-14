import Image from "next/image";
import { Button } from "../ui/button";
import Brain from '../../public/assets/brain-logo.png';
import Test from '../../public/test-logo.png';
import Certificate from '../../public/certificate-logo.png';
import Introductions from "./introductions";

const Features = () => {
    return (
        <section className="bg-[#fef8f8] py-[100px]">
            <div className="max-w-[1300px] mx-auto">
                <Introductions
                    title={'EDUCATION FOR EVERYONE'}
                    subtitle={'Online Coaching Lessons For Remote Learning'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    size={'half'}
                    align={'center'}
                />
                <div className="flex justify-center items-center gap-[25px] flex-col md:flex-row pt-[55px]">
                    <div className="bg-[#ffffff] flex flex-col gap-[16px] justify-center items-start px-[35px] py-[40px] rounded-[5px] w-[400px] hover:scale-110 ease-linear duration-100">
                        <Image
                            className="h-[60px] w-[60px]"
                            src={Brain}
                            alt=""
                            height={500}
                            width={500}
                        />
                        <h3 className="font-[800] text-[22px] text-[#00030e] ">Learn from Industry Experts</h3>
                        <p className="text-[16px] text-[#606060]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="text-sm text-[#ff4955] h-7 gap-1"
                        >
                            Start Now!
                        </Button>
                    </div>
                    <div className="bg-[#ffffff] flex flex-col gap-[16px] justify-center items-start px-[35px] py-[40px] rounded-[5px] w-[400px] hover:scale-110 ease-linear duration-100">
                        <Image
                            className="h-[60px] w-[60px]"
                            src={Test}
                            alt=""
                            height={500}
                            width={500}
                        />
                        <h3 className="font-[800] text-[22px] text-[#00030e] ">Test your skills like a pro</h3>
                        <p className="text-[16px] text-[#606060]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="text-sm text-[#ff4955] h-7 gap-1"
                        >
                            Start Now!
                        </Button>
                    </div>
                    <div className="bg-[#ffffff] flex flex-col gap-[16px] justify-center items-start px-[35px] py-[40px] rounded-[5px] w-[400px] hover:scale-110 ease-linear duration-100">
                        <Image
                            className="h-[60px] w-[60px]"
                            src={Certificate}
                            alt=""
                            height={500}
                            width={500}
                        />
                        <h3 className="font-[800] text-[22px] text-[#00030e]">Get certification</h3>
                        <p className="text-[16px] text-[#606060]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="text-sm text-[#ff4955] h-7 gap-1"
                        >
                            Start Now!
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;