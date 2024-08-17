import Introductions from "@/components/home/introductions";
import Test from "./_components/test";
import { getTest, getTestAttemptByUserIdAndTitle } from "@/queries/tests";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

const page = async ({ params: { title } }) => {
  const test = await getTest(title);
  const session = await auth();
  const loggedInUser = await getUserByEmail(session?.user?.email);
  const attempt = await getTestAttemptByUserIdAndTitle(
    loggedInUser?.id,
    test?.title
  );

  return (
    <div className="py-[60px] bg-[#fafbff]">
      <Introductions
        title={"Test"}
        subtitle={`${test?.title} Questions`}
        description={`Test, rate and improve your ${test?.title} knowledge with these questions.`}
        size={"half"}
        align={"center"}
      />
      <Test
        test={test}
        userId={loggedInUser?.id}
        previousAttempt={attempt?.attempts}
      />
    </div>
  );
};

export default page;