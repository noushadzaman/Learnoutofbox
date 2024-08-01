'use client';

import { useState } from "react";
import Progress from "./progress";
import Question from "./question";
import TestInteractions from "./test-interactions";
import { Celebration } from "./celebration";
import { doUpdateTestAttempt } from "@/app/actions/test";
import { useRouter } from "next/navigation";

const Test = ({ test, userId, previousAttempt }) => {
    const router = useRouter();
    const [count, setCount] = useState(previousAttempt?.length || 0);
    const [isQuestion, setIsQuestion] = useState(true);
    const totalQuestions = test?.questions?.length;
    const [progress, setProgress] = useState(previousAttempt?.length * 100 / totalQuestions || 0);
    const [attempts, setAttempts] = useState(previousAttempt || []);
    console.log(test?.title);

    const onQuestionInteract = async (event, fromOnNext) => {
        if (attempts.length === totalQuestions) {
            return;
        }
        try {
            if (userId) {
                const newAttempt = {
                    attempts: [
                        ...attempts,
                        {
                            id: test?.questions[count].id,
                            event
                        }
                    ],
                    userId,
                    title: test?.title
                }
                await doUpdateTestAttempt(newAttempt);
            }
            if (fromOnNext === 'fromOnNext') {
                return;
            }
            onNext('fromOnQuestionInteract');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setAttempts([
                ...attempts,
                {
                    id: test?.questions[count].id,
                    event
                }
            ]);
            router.refresh();
        }
    }

    const onNext = (fromOnQuestionInteract) => {
        if (count === totalQuestions) {
            return;
        };
        setProgress((progress) => Math.floor(progress + 100 / totalQuestions));
        if (count+1 === totalQuestions) {
            setProgress(100);
        };
        setCount((count) => count + 1);
        setIsQuestion(true);
        if (fromOnQuestionInteract === 'fromOnQuestionInteract') {
            return;
        }
        onQuestionInteract('skipped', 'fromOnNext');
    }

    const onPrevious = () => {
        if (count === 0) {
            return
        }
        setProgress((progress) => progress - 100 / totalQuestions);
        setCount((count) => count - 1);
        setIsQuestion(true);
        attempts.pop();
        setAttempts([...attempts]);
    }

    const reset = () => {
        setCount(0);
        setProgress(0);
        setAttempts([]);
    }

    return (
        <div>
            <Progress
                count={count}
                totalQuestions={totalQuestions}
                attempts={attempts}
                previousAttempt={previousAttempt}
                progress={progress}
                onPrevious={onPrevious}
                onNext={onNext}
                reset={reset}
                userId={userId}
            />
            <Question
                question={test?.questions[count]}
                isQuestion={isQuestion}
                setIsQuestion={setIsQuestion}
            />
            <TestInteractions
                question={test?.questions[count]}
                onQuestionInteract={onQuestionInteract}
            />
            {
                count === totalQuestions &&
                <Celebration />
            }
        </div>
    );
};

export default Test;