import ShapeDiv from "./ShapeDiv";

const Introductions = ({ title, subtitle, description, align, size }) => {

    return (
        <div
            className={`flex items-${align} justify-center flex-col ${size == 'half' ? 'max-w-[90%] md:max-w-[50%]' : ''} ${align == 'center' && 'mx-auto'} text-${align} space-y-4`}
        >
            <ShapeDiv variations={`w-[90%] h-[60px] bg-[#9ab3db] shadow-lg`}>
                <p
                    className="text-[#ff4955] font-[600] text-[14px]"
                >
                    {
                        title
                    }
                </p>
            </ShapeDiv>
            <p
                className="text-[#00030e] font-[800] text-[36px] my-[5px] leading-[43px]"
            >
                {
                    subtitle
                }
            </p>
            <p
                className="text-[#606060] text-[16px] leading-[25px]"
            >
                {
                    description
                }
            </p>
        </div>
    );
};

export default Introductions;