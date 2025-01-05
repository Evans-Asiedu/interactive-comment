import React, { useState } from 'react';
import ActionButton from "./actionButton";
import CommentBody from "./commentBody";
import CommentHeader from "./commentHeader";
import VotingButton from "./voting";
import AddCommentForm from './addCommentForm';
import { addReply } from '../services/commentService';
import data from '../services/data.json';

const URL = process.env.PUBLIC_URL;
const currentUser = data.currentUser

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

    const isOwner = comment.user.username === currentUser.username;

    return (
        <>
        <article className="comment">
            <VotingButton />

            <div>
                <CommentHeader comment={comment}/>
                <CommentBody replyTo={comment?.replyingTo} text={comment.content} />
            </div>
            <div className="comment__actions">
                {
                    isOwner ? (
                        <>
                            <ActionButton 
                                type="delete"
                                icon={`${URL}/images/icon-delete.svg`}
                                label="Delete"
                                onClick={() => console.log("Delete clicked")}
                            />
                            <ActionButton 
                                type="edit"
                                icon={`${URL}/images/icon-edit.svg`}
                                label="Edit"
                                onClick={() => console.log("Edit clicked")}
                            />
                        </>
                    ) : <ActionButton   
                    type="reply"
                    icon={`${URL}/images/icon-reply.svg`}
                    label="Reply"
                    onClick={handleReplyClick}/>
                }
               
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