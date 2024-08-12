"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Comments from "./comments";

function VideoDescription({ description, lessonId, loggedInUserId, comments, loggedInUser }) {

	return (
		<div className="mt-4">
			<Tabs defaultValue="details">
				<TabsList className="bg-transparent p-0 border-b border-border w-full justify-start h-auto rounded-none">
					<TabsTrigger className="capitalize" value="details">
						Description
					</TabsTrigger>
					<TabsTrigger className="capitalize" value="questions">
						Ask a question
					</TabsTrigger>
				</TabsList>
				<div className="pt-3">
					<TabsContent value="details">
						<div
							dangerouslySetInnerHTML={{ __html: `${description}` }}
						/>
					</TabsContent>
					<TabsContent value="questions">
						<Comments lessonId={lessonId} loggedInUserId={loggedInUserId} comments={comments} loggedInUser={loggedInUser}/>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}

export default VideoDescription;
