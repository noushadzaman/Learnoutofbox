import { CircleCheckBig, SkipForward, Sparkles } from "lucide-react";

const TestInteractions = ({ onQuestionInteract, question }) => {
    const isDisabled = question === undefined;

    return (
        <div className="max-w-[60%] mx-auto mt-[20px] text-center flex flex-col md:flex-row gap-[20px] text-[15px]">
            <button
                onClick={() => onQuestionInteract('knew')}
                disabled={isDisabled}
                className={`flex items-center gap-[10px] border bg-white border-gray-300 rounded-[5px] w-full  py-[13px] px-[15px] ${isDisabled ? 'opacity-50' : 'hover:bg-[#100f1f] hover:text-[white] hover:border-[#100f1f]'}`}>
                <CircleCheckBig size={16} />
                <p>Already Know that</p>
            </button>
            <button
                onClick={() => onQuestionInteract('learned')}
                disabled={isDisabled}
                className={`flex items-center gap-[10px] border bg-white border-gray-300 rounded-[5px] w-full py-[13px] px-[15px] ${isDisabled ? 'opacity-50' : 'hover:bg-[#100f1f] hover:text-[white] hover:border-[#100f1f]'}`}>
                <Sparkles size={16} />
                <p>{`Didn't`} Know that</p>
            </button>
            <button
                onClick={() => onQuestionInteract('skipped')}
                disabled={isDisabled}
                className={`flex items-center gap-[10px] border rounded-[5px] w-full py-[13px] px-[15px] border-[#ff4c58] text-[#ff4c58] bg-white ${isDisabled ? 'opacity-50' : 'hover:bg-[#ff4c58] hover:text-white '}`}>
                <SkipForward size={16} />
                <p>Skip Question</p>
            </button>
        </div>
    );
};

export default TestInteractions;