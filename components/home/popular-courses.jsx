import Link from "next/link";
import Introductions from "./introductions";
import CourseCard from "./popular-course-card";
import { getMostPopularCourses } from "@/queries/home";
import { getUserByEmail } from "@/queries/users";
import { auth } from "@/auth";

const PopularCourses = async () => {
    const session = await auth();
    const loggedInUser = await getUserByEmail(session?.user?.email);
    const popularCourses = await getMostPopularCourses();

    return (
        <section className="py-[100px] max-w-[1250px] mx-auto">
            <Introductions
                title={'GO AT YOUR OWN PACE'}
                subtitle={'Top Selling Courses'}
                description={'Explore all of our courses and pick your suitable ones to enroll and start learning with us! We ensure that you will never regret it!'}
                align={'center'}
                size={'half'}
            />
            <div className="flex flex-col flex-wrap justify-center items-center md:flex-row gap-[30px] my-[50px] mx-[30px]">
                {
                    popularCourses.map(course => <CourseCard
                        key={course.id}
                        course={course}
                        loggedInUser={loggedInUser}
                    />)
                }
            </div>
            <p className="leading-[25px] text-[#606060] max-w-[60%] mx-auto text-center text-[15px]">Enjoy the top notch learning methods and achieve next level skills! You are the creator of your own career & we will guide you through that. <Link
                href="/register/student"
                className="text-[#fe4a55] hover:underline hover:text-[#606060]"
            >Register Free Now!</Link>.</p>
        </section>
    );
};

export default PopularCourses;