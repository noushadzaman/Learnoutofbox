import { getCategories } from "@/queries/categories";
import Introductions from "./introductions";
import Category from "./category";
import ShapeDiv from "./ShapeDiv";

const Categories = async () => {
    const categories = await getCategories();

    return (
        <div className="pb-[120px] pt-[100px] bg-[#fef8f8] relative">
            <Introductions
                key={3}
                title={'EXPLORE LEARNING CATEGORIES'}
                subtitle={'Courses Aligned with Your Goals'}
                description={"Browse diverse categories to find courses that match your interests and career aspirations."}
                size={'half'}
                align={'center'}
            />
            <div className="grid md:grid-cols-3 gap-[25px] my-10 max-w-[1100px] mx-auto ">
                {
                    categories.slice(0, 6).map(c => <Category key={c?.id} c={c} />)
                }
            </div>
            <div className="hidden md:block absolute top-[90px] left-[150px]">
                <ShapeDiv variations={`w-[50px] h-[50px] bg-[#9ab3db] shadow-lg`} />
            </div>
            <div className="hidden md:block absolute top-[215px] right-[75px] z-0">
                <ShapeDiv variations={`w-[80px] h-[80px] bg-[#f58e87] shadow-lg`} />
            </div>
        </div>
    );
};

export default Categories;