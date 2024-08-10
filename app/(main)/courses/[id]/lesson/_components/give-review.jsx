"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "./review-modal";

const GiveReview = ({ courseId, loggedInUserId, testimonial }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsReviewModalOpen(true)}
                variant="outline"
                className="w-full mt-6"
            >
                Give Review
            </Button>
            <ReviewModal
                testimonial={testimonial}
                courseId={courseId}
                loggedInUserId={loggedInUserId}
                open={isReviewModalOpen}
                setOpen={setIsReviewModalOpen}
            />
        </>
    );
};

export default GiveReview;