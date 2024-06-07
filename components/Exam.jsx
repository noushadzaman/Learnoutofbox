'use client'

import { toast } from "sonner";
import { Button } from "./ui/button";

const Exam = () => {
    const handleClick = (mode) => {
        mode ? toast.success("Test success") : toast.error("Test error")
    }

    return (
        <Button variant="link" onClick={() => handleClick(false)}>Test Toast</Button>
    );
};

export default Exam;