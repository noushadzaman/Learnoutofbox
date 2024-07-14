
const Introductions = ({ title, subtitle, description, align, size }) => {
    return (
        <div
            className={`flex items-center justify-center flex-col ${size == 'half' ? 'max-w-[90%] md:max-w-[50%]' : ''} mx-auto text-${align} space-y-4`}
        >
            <p
                className="text-[#ff4955] font-[600] text-[14px]"
                >{title}</p>
            <p
                className="text-[#00030e] font-[800] text-[36px] my-[5px] leading-[43px]"
            >{subtitle}​</p>
            <p
                className="text-[#606060] text-[16px] leading-[25px]"
            >{description}</p>
        </div >
    );
};

export default Introductions;