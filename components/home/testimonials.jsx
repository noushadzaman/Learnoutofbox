import { getReviews } from "@/queries/reviews";
import Introductions from "./introductions";
import { TestimonialCarousel } from "./testimonial-carousel";

const HomeTestimonials = async () => {
    const reviews = await getReviews();

    return (
        <section className="py-[100px]">
            <div className="max-w-[1300px] mx-auto">
                <Introductions
                    title={'TESTIMONIALS'}
                    subtitle={'Our Learners Feedback'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    align={'center'}
                    size={'half'}
                />
                <div className="py-[60px]">
                    <TestimonialCarousel reviews={reviews} />
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonials;