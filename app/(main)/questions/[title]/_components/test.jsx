'use client';

import { useState } from "react";
import Progress from "./progress";
import Question from "./question";
import TestInteractions from "./test-interactions";
import { Celebration } from "./celebration";
import { doUpdateTestAttempt, goToPreviousTestAttempt } from "@/app/actions/test";
import { useRouter } from "next/navigation";

const Test = ({ test, userId, previousAttempt }) => {
    const router = useRouter();
    const [count, setCount] = useState(previousAttempt?.length || 0);
    const [isQuestion, setIsQuestion] = useState(true);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const totalQuestions = test?.questions?.length;
    const [progress, setProgress] = useState(previousAttempt?.length * 100 / totalQuestions || 0);
    const [attempts, setAttempts] = useState(previousAttempt || []);

    const onQuestionInteract = async (event, fromOnNext) => {
        if (attempts.length === totalQuestions) {
            return;
        }
        try {
            setIsBtnDisabled(true);
            if (userId) {
                const newAttempt = {
                    attempts:
                    {
                        id: test?.questions[count]._id,
                        event
                    },
                    userId,
                    title: test?.title
                }
                await doUpdateTestAttempt(newAttempt);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setAttempts([
                ...attempts,
                {
                    id: test?.questions[count]._id,
                    event
                }
            ]);
            router.refresh();
            setIsBtnDisabled(false);
            if (fromOnNext === 'fromOnNext') {
                return;
            }
            onNext('fromOnQuestionInteract');
        }
    }

    const onNext = (fromOnQuestionInteract) => {
        setCount((count) => count + 1);
        setProgress((count + 1) * (100 / totalQuestions));
        setIsQuestion(true);
        if (count + 1 === totalQuestions) {
            setIsBtnDisabled(true);
            return;
        };
        if (fromOnQuestionInteract === 'fromOnQuestionInteract') {
            return;
        }
        onQuestionInteract('skipped', 'fromOnNext');
    }

    const onPrevious = async () => {
        if (count === 0) {
            return
        }
        try {
            setProgress((progress) => progress - 100 / totalQuestions);
            setCount((count) => count - 1);
            setIsQuestion(true);
            attempts.pop();
            setAttempts([...attempts]);
            const newAttempt = {
                lastAttempt: test?.questions[count - 1]._id,
                userId,
                title: test?.title
            }
            setIsBtnDisabled(true);
            if (userId) {
                await goToPreviousTestAttempt(newAttempt);
            }
        }
        catch (error) {
            console.log();
        }
        finally {
            setIsBtnDisabled(false);
        }
    }

    const reset = async () => {
        setCount(0);
        setProgress(0);
        setAttempts([]);
        setIsBtnDisabled(true);
        try {
            const newAttempt = {
                attempts: [],
                userId,
                title: test?.title
            };
            if (userId) {
                await doUpdateTestAttempt(newAttempt);
            }
        }
        catch (error) {
            console.log();
        }
        finally {
            setIsBtnDisabled(false);
        }
    }

    return (
        <>
            <Progress
                count={count}
                totalQuestions={totalQuestions}
                attempts={attempts}
                previousAttempt={previousAttempt}
                progress={progress}
                onPrevious={onPrevious}
                isBtnDisabled={isBtnDisabled}
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
                isBtnDisabled={isBtnDisabled}
                onQuestionInteract={onQuestionInteract}
            />
            {
                count === totalQuestions &&
                <Celebration />
            }
        </>
    );
};

export default Test;