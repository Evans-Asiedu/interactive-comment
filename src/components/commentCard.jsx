import React, { useState } from 'react';
import ActionButton from "./actionButton";
import CommentBody from "./commentBody";
import CommentHeader from "./commentHeader";
import VotingButton from "./voting";
import AddCommentForm from './addCommentForm';
import { addReply } from '../services/commentService';

const URL = process.env.PUBLIC_URL;

const CommnetCard = ({ comment }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    }
    const handleAddReply = (replyContent) => {
        console.log(`Replying to comment ${comment.id} with: ${replyContent}`);
        addReply(comment.id, `@${comment.user.username} ${replyContent}`, comment.user.username);
        setShowReplyForm(false); 
    };

    return (
        <>
        <article className="comment">
            <VotingButton />

            <div>
                <CommentHeader comment={comment} />
                <CommentBody replyTo={comment?.replyingTo} text={comment.content} />
            </div>
            <div className="comment__actions">
                <ActionButton   
                    type="reply"
                    icon={`${URL}/images/icon-reply.svg`}
                    label="Reply"
                    onClick={handleReplyClick}/>
            </div>
        </article>
        {/* Show the reply form when the "Reply" button is clicked */}
        {showReplyForm && (
            <div className="reply-form-container">
                <AddCommentForm 
                    onAddComment={handleAddReply} 
                    initialValue={`@${comment.user.username} `}
                />
            </div>
        )} 
        </>
    );
}

export default CommnetCard;