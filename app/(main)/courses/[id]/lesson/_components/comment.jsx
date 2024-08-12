'use client';

import { ArrowBigUpDash, Reply as ReplyIcon } from "lucide-react";
import Image from "next/image";
import ReplyForm from "./reply-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Replies from "./replies";
import { upVoteComment } from "@/app/actions/comment";
import { useRouter } from "next/navigation";

const Comment = ({ c, loggedInUserId, loggedInUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [seeReplies, setSeeReplies] = useState(false);
    const [replies, setReplies] = useState(c?.replies || []);
    const router = useRouter();

    async function upVote() {
        const res = await upVoteComment({ loggedInUserId, commentId: c.id });
        router.refresh();
    }

    return (
        <div
            key={c.id}
            className="md:basis-1/2 lg:basis-1/3"
        >
            <div className="sm:break-inside-avoid">
                <blockquote className="rounded-lg bg-gray-50 p-6  sm:p-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Image
                                alt=""
                                src={c?.user?.profilePicture}
                                width={100}
                                height={100}
                                className="size-14 rounded-full object-cover"
                            />
                            <div>
                                <p className="mt-0.5 text-md font-medium text-gray-900">
                                    {c?.user?.firstName}{" "}{c?.user?.lastName}
                                </p>
                                <p className="mt-0.5 text-sm font-medium text-gray-900">
                                    {c?.user?.designation}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center">
                                <ArrowBigUpDash
                                    onClick={upVote}
                                    className="cursor-pointer text-[#ff4955]"
                                    fill={c?.upVotes.includes(loggedInUserId) ? "#ff4955" : "#f9fafc"}
                                />
                                {c?.upVotes.length}
                            </div>
                            <ReplyIcon
                                onClick={() => setIsEditing(!isEditing)}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <p className="text-gray-700 mt-5">{c?.content}</p>
                    {
                        seeReplies && <Replies replies={replies} />
                    }
                    {
                        replies.length > 0 && <Button
                            onClick={() => setSeeReplies(!seeReplies)}
                            className="flex justify-center items-center w-full"
                            variant="link"
                        >
                            {
                                seeReplies ? "Hide replies" : "See replies"
                            }
                        </Button>
                    }
                    <ReplyForm
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        commentId={c?.id}
                        loggedInUserId={loggedInUserId}
                        setReplies={setReplies}
                        loggedInUser={loggedInUser}
                    />
                </blockquote>
            </div>
        </div >
    );
};

export default Comment;