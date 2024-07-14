import { getCourseDetailsForCard } from "@/queries/courses";
import { Heart, NotebookText, Users } from "lucide-react";
import Image from "next/image";

const PopularCourseCard = async ({ course }) => {
    const { title, description, modules, price, instructor, testimonials,
        thumbnail } = await getCourseDetailsForCard(course.id);

    return (
        <div className="shadow-[#e1ecfe] shadow-lg rounded-[5px] max-w-[370px]">
            <div className="relative">
                {/* <Heart size={27} className="absolute right-6 top-5 text-white cursor-pointer" /> */}
                <Image
                    className="h-[250px] w-full rounded-t-[5px] bg-cover"
                    src={thumbnail}
                    alt="Course image"
                    height={600}
                    width={600}
                />
                <div
                    className="bg-[#e35e67] rounded-full text-white h-[65px] w-[65px] flex justify-center items-center font-[800] absolute right-6 bottom-[-32.5px] shadow-xl"
                >
                    ${price}
                </div>
            </div>
            <div className="flex flex-col gap-[15px] p-[30px]">
                <div className="flex items-center gap-[10px]">
                    <Image
                        className="w-[35px] h-[35px] rounded-full bg-cover"
                        src={instructor?.profilePicture}
                        alt="Course image"
                        height={600}
                        width={600}
                    />
                    <p className="text-[#fe4a55] text-[15px] font-[600]">
                        {instructor?.firstName} {' '}
                        {instructor?.lastName}
                    </p>
                </div>
                <p className="text-[24px] font-[800] leading-[31px] text-[#00030e]">{title}</p>
                <p className="leading-[25px] text-[#606060]">{description}</p>
                <div className="flex justify-between items-center text-[#606060]">
                    <div className="flex items-center justify-center gap-[5px]">
                        <NotebookText size={15} className="text-[#fe4a55]" />
                        <p className="text-[15px]">{modules.length} Modules</p>
                    </div>
                    <div className="flex items-center justify-center gap-[5px]">
                        <Users size={15} className="text-[#fe4a55]" />
                        <p className="text-[15px]">{testimonials.length} reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCourseCard;