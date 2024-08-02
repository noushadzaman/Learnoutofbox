import { Progress as ProgressBar } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CircleCheckBig, RotateCcw, SkipForward, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import AlertBanner from "@/components/alert-banner";

const Progress = ({ count, progress, attempts, previousAttempt, onPrevious, onNext, reset, totalQuestions, isBtnDisabled, userId }) => {
    const countByEvent = (attempts || previousAttempt).reduce((acc, obj) => {
        if (acc[obj.event]) {
            acc[obj.event]++;
        } else {
            acc[obj.event] = 1;
        }
        return acc;
    }, {});

    return (
        <div className="max-w-[60%] mx-auto border border-gray-300 rounded-[5px] mt-[20px] bg-[white]">
            <div className="py-[20px] px-[20px]">
                <div className="flex items-center justify-center gap-[50px]">
                    <ProgressBar value={progress} className="" />
                    <div className="text-nowrap text-[14px] flex items-center justify-center">
                        <button
                            disabled={isBtnDisabled}
                            onClick={onPrevious}
                        >
                            <ChevronLeft
                                size={18} className={`text-gray-400 ${count + 1 !== totalQuestions && !isBtnDisabled && 'hover:text-[#100f1f]'} cursor-pointer`}
                            />
                        </button>
                        {count} / {totalQuestions}
                        <button
                            disabled={count + 1 === totalQuestions || isBtnDisabled}
                            onClick={onNext}
                        >
                            <ChevronRight
                                size={18}
                                className={`text-gray-400 ${count + 1 !== totalQuestions && !isBtnDisabled && 'hover:text-[#100f1f]'} cursor-pointer`}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex gap-[15px] items-center pt-[10px]">
                    <div className="flex gap-2 text-[14px] items-center">
                        <CircleCheckBig size={16} /> <p>Knew</p>
                        <Badge className='rounded-[5px] bg-gray-200 text-black hover:bg-gray-200'>{countByEvent.knew || 0} Items</Badge>
                    </div>
                    <div className="flex gap-2 text-[14px] items-center">
                        <Sparkles size={16} /> Learnt
                        <Badge className='rounded-[5px] bg-gray-200 text-black hover:bg-gray-200'>{countByEvent.learned || 0} Items</Badge>
                    </div>
                    <div className="flex gap-2 text-[14px] items-center">
                        <SkipForward size={16} /> Skip
                        <Badge className='rounded-[5px] bg-gray-200 text-black hover:bg-gray-200'>{countByEvent.skipped || 0} Items</Badge>
                    </div>
                    <div
                        onClick={reset}
                        className="flex gap-[2px] text-[14px] items-center justify-center text-[#ff4a53] cursor-pointer">
                        <RotateCcw size={14} /> Reset
                    </div>
                </div>
            </div>
            {
                !userId &&
                <AlertBanner
                    label="Login to save your progress."
                    variant="warning"
                />
            }
        </div>
    );
};

export default Progress;