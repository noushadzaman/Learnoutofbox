
import { getLesson } from "@/queries/lesson";
import Modal from "../../../_components/modal";
import Lesson from "../../../_components/lesson";

const LessonPageModal = async ({ params: { courseId, moduleId, lessonId } }) => {
    const lesson = await getLesson(lessonId);

    return (
        <Modal>
            <Lesson
                courseId={courseId}
                moduleId={moduleId}
                lesson={lesson}
            />
        </Modal>
    );
};

export default LessonPageModal;