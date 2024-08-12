import Comment from "./comment";
import { CommentForm } from "./comment-form";


const Comments = ({ comments, lessonId, loggedInUserId, loggedInUser }) => {

    return (
        <section className="pb-8 md:pb-12 lg:pb-24">
            <CommentForm
                lessonId={lessonId}
                loggedInUserId={loggedInUserId}
            />
            <h1 className="text-xl font-[600] mt-8">Comments</h1>
            {
                comments.length > 0 ?
                    <div className="py-4">
                        {comments.map((c) => (
                            <Comment
                                key={c.id}
                                c={c}
                                loggedInUserId={loggedInUserId}
                                loggedInUser={loggedInUser}
                            />
                        ))}
                    </div> :
                    <p className="text-center text-gray-500">No comments</p>
            }

        </section>
    );
};

export default Comments;