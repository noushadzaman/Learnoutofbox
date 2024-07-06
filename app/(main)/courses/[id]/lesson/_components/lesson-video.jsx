'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

const LessonVideo = ({ courseId, lesson, module }) => {
    const [hasWindow, setHasWindow] = useState(false);
    const [started, setStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [duration, setDuration] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    useEffect(() => {
        async function updateLessonWatch() {
            const response = await fetch(`/api/lesson-watch`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    courseId: courseId,
                    lessonId: lesson.id,
                    moduleSlug: module,
                    state: "started",
                    lastTime: 0
                })
            })
            if (response.state === 200) {
                const result = await response.text();
                console.log(result);
                setStarted(true);
            }
        }
        started && updateLessonWatch();
    }, [started]);

    useEffect(() => {
        async function updateLessonWatch() {
            const response = await fetch(`/api/lesson-watch`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    courseId: courseId,
                    lessonId: lesson.id,
                    moduleSlug: module,
                    state: "completed",
                    lastTime: duration
                })
            })
            if (response.state === 200) {
                const result = await response.text();
                console.log(result);
                setEnded(true);
                router.refresh();
            }
        }
        ended && updateLessonWatch();
    }, [ended]);

    function handleOnStart() {
        setStarted(true);
    }
    function handleOnDuration(duration) {
        setDuration(duration);
    }
    function handleOnProgress(state) {

    }
    function handleOnEnded() {
        setEnded(true);
    }

    return (
        <>
            {
                hasWindow && <ReactPlayer
                    url={lesson.video_url}
                    width={'100%'}
                    height={"470px"}
                    controls={true}
                    onStart={handleOnStart}
                    onDuration={handleOnDuration}
                    onProgress={handleOnProgress}
                    onEnded={handleOnEnded}
                />
            }
        </>
    );
};

export default LessonVideo;