import Introductions from "@/components/home/introductions";
import TestCard from "./_components/test-card";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { getTests } from "@/queries/tests";

const page = async () => {
  const session = await auth();
  const loggedInUser = await getUserByEmail(session?.user?.email);
  const tests = await getTests();

  return (
    <section className="bg-[#fef8f8]">
      <div className="py-[80px] mx-auto max-w-[80%] xl:max-w-[60%]">
        <Introductions
          title={"QUESTIONS"}
          subtitle={
            "Skill assessments to help you test and improve your knowledge and skill up"
          }
          align={"center"}
        />
      </div>
      <div className="bg-[#fafbff] border-gray-200 border-y">
        <div className="pt-[30px] pb-[100px] grid grid-cols-2 gap-[12px] max-w-[80%] xl:max-w-[60%] mx-auto">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} userId={loggedInUser?.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
