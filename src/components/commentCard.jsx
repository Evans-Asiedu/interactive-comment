import ActionButton from "./actionButton";
import CommentBody from "./commentBody";
import CommentHeader from "./commentHeader";
import VotingButton from "./voting";

const URL = process.env.PUBLIC_URL;

const CommnetCard = ({ comment }) => {
    return (
        <article className="comment">
            <VotingButton />

            <div>
                <CommentHeader />
                <CommentBody replyTo={comment?.replyingTo} text={comment.content} />
            </div>
            <div className="comment__actions">
                <ActionButton   
                    type="reply"
                    icon={`${URL}/images/icon-reply.svg`}
                    label="Reply"
                    onClick={() => console.log("clicked")}/>
            </div>
        </article>
    );
}

export default CommnetCard;