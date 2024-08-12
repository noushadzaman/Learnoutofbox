import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Replies = ({ replies }) => {
    return (
        <div className="py-4">
            {replies.map((r) => (
                <div key={r.id} className="ml-[15px] mt-3">
                    <div
                        className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Image
                                alt=""
                                src={r?.user?.profilePicture}
                                width={100}
                                height={100}
                                className="size-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="mt-0.5 text-sm font-medium text-gray-900">
                                    {r?.user?.firstName}{" "}{r?.user?.lastName}
                                </p>
                                <p className="mt-0.5 text-sm font-medium text-gray-900">
                                    {r?.user?.designation}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="my-4 text-gray-700 text-sm">
                        {r?.content}
                    </p>
                    <Separator />
                </div>
            ))}
        </div>
    );
};

export default Replies;