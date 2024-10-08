import { Separator } from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { getLessonBySlug } from "@/queries/lesson";
import LessonVideo from "./_components/lesson-video";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getComments } from "@/queries/comments";

const Course = async ({ params: { id }, searchParams: { name, module } }) => {
	const course = await getCourseDetails(id);
	const allModules = replaceMongoIdInArray(course.modules).toSorted((a, b) => a.order - b.order);

	const defaultLesson = replaceMongoIdInObject(allModules[0]?.lessonIds?.toSorted((a, b) => a.order - b.order)[0]);

	const defaultModule = module ?? allModules[0].slug;

	const lessonToPlay = name ? await getLessonBySlug(name) : defaultLesson;
	const loggedInUser = await getLoggedInUser();
	const comments = await getComments(lessonToPlay?.id);

	return (
		<div className="flex flex-col max-w-4xl mx-auto pb-20">
			<div className="w-[100%] px-2">
				<LessonVideo
					courseId={id}
					lesson={lessonToPlay}
					module={defaultModule}
				/>
			</div>
			<div className="p-4 ">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<h2 className="text-2xl font-semibold mb-2">
						{lessonToPlay.title}
					</h2>
				</div>
				<Separator />
				<VideoDescription
					lessonId={lessonToPlay?.id}
					loggedInUserId={loggedInUser?.id}
					loggedInUser={loggedInUser}
					description={lessonToPlay.description}
					comments={comments}
				/>
			</div>
		</div>
	);
};
export default Course;
