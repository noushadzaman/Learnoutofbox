'use client';

import { doCreateTestAttempt } from "@/app/actions/test";
import { useRouter } from "next/navigation";

const TestCard = ({ test, userId }) => {
    const router = useRouter();
    async function onCreateTestAttempt() {
        if (userId) {
            const attempt = {
                title: test?.title,
                userId
            }
            await doCreateTestAttempt(attempt);
        }
        router.push(`/questions/${test.slug}`);
    }

    return (
        <div>
            <div
                onClick={onCreateTestAttempt}
                key={test.title}
                className="bg-[white] border-gray-200 border rounded-[5px] px-[20px] py-[20px] cursor-pointer hover:scale-110 ease-linear duration-100 hover:border-gray-400"
            >
                <h2 className="text-[20px] font-[600]">{test.title}</h2>
                <p className="text-[14px] text-gray-400">
                    {test.questions.length} Questions
                </p>
            </div>
        </div>
    );
};

export default TestCard;