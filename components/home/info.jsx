import { getAverageRating, getEnrolledCount, getFinishedLessonsCount, getInstructorCount } from "@/queries/home"

export async function Info() {
    const totalEnrollments = await getEnrolledCount();
    const totalInstructors = await getInstructorCount();
    const totalFinishedLessons = await getFinishedLessonsCount();
    const avgRating = await getAverageRating();

    return (
        <section className="bg-[#fef8f8] flex flex-col md:flex-row flex-wrap gap-10 items-center justify-center py-[100px]">
            <div className="p-[85px] h-[280px] w-[280px] bg-[white] rounded-full border-dashed border-[#AD8360] border-[1px] flex flex-col justify-center items-center">
                <h2
                    className="text-[#FE4A55] text-[44px] font-[800]"
                >{totalEnrollments}</h2>
                <p
                    className="text-[16px] font-[700] text-nowrap"
                >ENROLLED LEARNERS</p>
            </div>
            <div className="p-[85px] h-[280px] w-[280px] bg-[white] rounded-full border-dashed border-[#AD8360] border-[1px] flex flex-col justify-center items-center">
                <h2
                    className="text-[#FE4A55] text-[44px] font-[800]"
                >{totalInstructors}</h2>
                <p
                    className="text-[16px] font-[700] text-nowrap"
                >ONLINE INSTRUCTORS</p>
            </div>
            <div className="p-[85px] h-[280px] w-[280px] bg-[white] rounded-full border-dashed border-[#AD8360] border-[1px] flex flex-col justify-center items-center">
                <h2
                    className="text-[#FE4A55] text-[44px] font-[800]"
                >{totalFinishedLessons}</h2>
                <p
                    className="text-[16px] font-[700] text-nowrap"
                >FINISHED LESSONS</p>
            </div>
            <div className="p-[85px] h-[280px] w-[280px] bg-[white] rounded-full border-dashed border-[#AD8360] border-[1px] flex flex-col justify-center items-center">
                <h2
                    className="text-[#FE4A55] text-[44px] font-[800]"
                >{((avgRating / 5) * 100).toFixed(2)}%</h2>
                <p
                    className="text-[16px] font-[700] text-nowrap"
                >SATISFACTION RATE</p>
            </div>
        </section>
    )
}
