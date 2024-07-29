import EnrollCourse from "@/components/enroll-course";
import { getCourseDetailsForCard } from "@/queries/courses";
import { NotebookText, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }) => {
  const courseDetails = await getCourseDetailsForCard(course.id);
  const { title, description, modules, price, instructor, testimonials,
    thumbnail } = courseDetails || {};

  return (
    <div
      className="shadow-[#e1ecfe] shadow-lg rounded-[5px] max-w-[350px] flex flex-col justify-between items-center">
      <div className="relative">
        {/* <Heart size={27} className="absolute right-6 top-5 text-white cursor-pointer" /> */}
        <Link
          key={course.id} href={`/courses/${course.id}`}
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
          <p className="text-[17px] font-[500] leading-[31px] text-[#00030e]">{course?.category?.title}</p>
        </Link>
        <p className="leading-[25px] text-[#606060]">
          {description?.slice(0, 100)}{description.length > 100 && '...'}
        </p>
        <div className="flex justify-between items-center text-[#606060]">
          <div className="flex items-center justify-center gap-[5px]">
            {/* <NotebookText size={15} className="text-[#fe4a55]" /> */}
            {/* <p className="text-[15px]">{modules?.length || 0} Modules</p> */}
            <Users size={15} className="text-[#fe4a55]" />
            <p className="text-[15px]">{course?.enrollments?.length} Students</p>
          </div>
          {/* <div className="flex items-center justify-center gap-[5px]">
            <Users size={15} className="text-[#fe4a55]" />
            <p className="text-[15px]">{testimonials?.length || 0} reviews</p>
          </div> */}
          <EnrollCourse asLink={true} courseId={course?.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;