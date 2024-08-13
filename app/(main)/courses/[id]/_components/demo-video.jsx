'use client';

import { convertSecondsToTimeFormat } from "@/lib/date";
import { CirclePlay, Play } from "lucide-react";
import Image from "next/image";

const DemoVideo = ({ demo, setDemoVideo, idx, demoVideo }) => {
    const videoId = demo.video_url.split('/embed/')[1].split('?')[0];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div
            onClick={() => setDemoVideo(idx)}
            className={`flex items-center justify-between font-bold cursor-pointer ${demoVideo === idx && 'bg-[#f58e87]'} p-1 rounded-[5px]`}>
            <div className="flex items-center gap-3">
                <Image
                    src={thumbnailUrl}
                    alt={demo?.title || 'Video thumbnail'}
                    height={80}
                    width={80}
                />
                <div className="flex items-center gap-2">
                    {demoVideo === idx && <CirclePlay size={16} className="opacity-80" />} {demo?.title}
                </div>
            </div>
            <p>{convertSecondsToTimeFormat(demo?.duration)}</p>
        </div>
    );
};

export default DemoVideo;