import { getCourseDetailsForCard } from "@/queries/courses";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EnrollCourse from "../enroll-course";

const CourseCard = async ({ course, loggedInUser }) => {
    const courseDetails = await getCourseDetailsForCard(course.id);
    const { title, description, price, instructor, 
        thumbnail, category } = courseDetails || {};

    return (
        <div
            className="shadow-[#e1ecfe] shadow-lg rounded-[5px] max-w-[370px]">
            <div className="relative">
                {/* <Heart size={27} className="absolute right-6 top-5 text-white cursor-pointer" /> */}
                <Link
                    href={`/courses/${course.id}`}
                >
                    <Image
                        className="h-[250px] w-full rounded-t-[5px] bg-cover"
                        src={thumbnail}
                        alt="Course image"
                        height={600}
                        width={600}
                    />
                </Link>
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
                <Link
                    key={course.id} href={`/courses/${course.id}`}
                >
                    <p className="text-[24px] font-[800] leading-[31px] text-[#00030e] hover:text-[#fe4a55] ease-in duration-150">{title}</p>
                    <p className="text-[17px] font-[500] leading-[31px] text-[#00030e]">{category?.title}</p>
                </Link>
                <p className="leading-[25px] text-[#606060]">
                    {description?.slice(0, 100)}{description?.length > 100 && '...'}
                </p>
                <div className="flex justify-between items-center text-[#606060]">
                    <div className="flex items-center justify-center gap-[5px]">
                        <Users size={15} className="text-[#fe4a55]" />
                        <p className="text-[15px]">{course?.count} Students</p>
                    </div>
                    <EnrollCourse asLink={true} courseId={course?.id} loggedInUser={loggedInUser} />
                </div>
            </div>
        </div>
    );
};

export default CourseCard;