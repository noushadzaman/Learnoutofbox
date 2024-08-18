
const Question = ({ question, isQuestion, setIsQuestion }) => {

    return (
        <div className="min-h-[380px] max-w-[60%] mx-auto border border-gray-300 rounded-[5px] mt-[20px] relative text-center bg-[white] ">
            {
                question &&
                <>
                    <div className={`flex flex-col justify-center items-center w-[100%] min-h-[380px] px-[20px] py-[40px] gap-[80px] bg-[white] ${!isQuestion && 'hidden'}`}>
                        <p className="text-[14px] text-gray-400">{question?.topic}・{question?.difficulty}</p>
                        <p className="text-[30px] font-[600]">{question?.question}</p>
                        <button
                            onClick={() => setIsQuestion(!isQuestion)}
                            className="underline underline-offset-4 text-gray-600 hover:text-black text-[15px]"
                        >Click to Reveal the Answer</button>
                    </div>
                    <div className={`${isQuestion && "hidden"} flex flex-col gap-[40px] justify-between py-[40px] px-[20px] bg-[#fef8f8] min-h-[380px]`}>
                        <p className={`text-[17px]`}>{question?.answer}</p>
                        <button
                            onClick={() => setIsQuestion(!isQuestion)}
                            className={`underline underline-offset-4 text-gray-600 hover:text-black text-[15px]`}
                        >Hide the Answer</button>
                    </div>
                </>
            }
        </div>
    );
};

export default Question;