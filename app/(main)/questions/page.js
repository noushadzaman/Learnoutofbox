import Introductions from "@/components/home/introductions";
import TestCard from "./_components/test-card";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

const tests = [
  {
    _id: 1,
    title: "React",
    slug: "react",
    questions: 5,
    topic: 10,
  },
  {
    _id: 2,
    title: "Javascript",
    slug: "javascript",
    questions: 5,
    topic: 10,
  },
  {
    _id: 3,
    title: "NextJS",
    slug: "nextJS",
    questions: 5,
    topic: 10,
  },
];

const page = async () => {
  const session = await auth();
  const { id } = await getUserByEmail(session?.user?.email);

  return (
    <section className="bg-[#fef8f8]">
      <div>
        <div className="py-[80px] pl-[150px] max-w-[80%] xl:max-w-[60%]">
          <Introductions
            title={"QUESTIONS"}
            subtitle={
              "Quizzes to help you test and improve your knowledge and skill up"
            }
            align={"center"}
          />
        </div>
      </div>
      <div className="bg-[#fafbff] border-gray-200 border-y">
        <div className="pt-[30px] pb-[40px] grid grid-cols-2 gap-[12px] max-w-[80%] xl:max-w-[60%] mx-auto">
          {tests.map((test) => (
            <TestCard key={test._id} test={test} userId={id} />
          ))}
        </div>
      </div>
      <div className="h-[50px]"></div>
    </section>
  );
};

export default page;
