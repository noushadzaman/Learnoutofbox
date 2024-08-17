import { getCategories } from "@/queries/categories";
import Introductions from "./introductions";
import Category from "./category";

const Categories = async () => {
    const categories = await getCategories();

    return (
        <div className="py-[120px] bg-[#fef8f8]">
            <Introductions
                title={'EXPLORE LEARNING CATEGORIES'}
                subtitle={'Courses Aligned with Your Goals'}
                description={"Browse diverse categories to find courses that match your interests and career aspirations."}
                size={'half'}
                align={'center'}
            />
            <div className="grid grid-cols-3 gap-[25px] my-10 max-w-[1100px] mx-auto">
                {
                    categories.slice(0, 6).map(c => <Category key={c?.id} c={c} />)
                }
            </div>
        </div>
    );
};

export default Categories;