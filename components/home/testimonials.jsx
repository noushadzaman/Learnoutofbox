import { getReviews } from "@/queries/home";
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
                    description={'Hear from our learners about their experiences and how our courses have helped them achieve their goals. Discover how our platform has made a difference in their educational journey and career growth.'}
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