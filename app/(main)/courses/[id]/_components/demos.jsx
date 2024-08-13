'use client';

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import DemoVideo from "./demo-video";
import { useState } from "react";
import ReactPlayer from "react-player";

const Demos = ({ demoVideos }) => {
    const [demoVideo, setDemoVideo] = useState(0);

    return (
        <>
            {
                demoVideos.length > 0 ?
                    <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{demoVideos[demoVideo]?.title}</DialogTitle>
                            <ReactPlayer
                                url={demoVideos[demoVideo]?.video_url}
                                height={300}
                                width={'100%'}
                                controls={true}
                            />
                        </DialogHeader>
                        <div className="flex flex-col gap-1">
                            {
                                demoVideos.map((demo, idx) => <DemoVideo
                                    key={demo.id}
                                    idx={idx}
                                    demo={demo}
                                    demoVideo={demoVideo}
                                    setDemoVideo={setDemoVideo}
                                />)
                            }
                        </div>
                    </DialogContent>
                    : <DialogContent>
                        <DialogTitle>No demo videos available for this course</DialogTitle>
                    </DialogContent>
            }
        </>
    );
};

export default Demos;