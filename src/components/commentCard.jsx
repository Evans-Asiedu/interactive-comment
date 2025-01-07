import React, { useState } from "react";
import ActionButton from "./actionButton";
import CommentBody from "./commentBody";
import CommentHeader from "./commentHeader";
import VotingButton from "./voting";
import AddCommentForm from "./addCommentForm";
import data from "../services/data.json";

const URL = process.env.PUBLIC_URL;
const currentUser = data.currentUser;

const CommnetCard = ({ comment, isReply, onAddReply, onEdit }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.replyingTo || '' + comment.content);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleAddReply = (replyContent) => {
    // console.log(`Replying to comment ${comment.id} with: ${replyContent}`);

    const updatedReplyContent = replyContent.replace(
      `@${comment.user.username} `,
      ""
    );
    onAddReply(comment.id, updatedReplyContent, comment.user.username);
    setShowReplyForm(false);
  };

  const isOwner = comment.user.username === currentUser.username;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  }
  
  const onEditComment = ()=> {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  }

  return (
    <>
      <article className={isReply ? "comment comment--reply" : "comment"}>
        <VotingButton />

        <div style={{width: "100%"}}>
          <CommentHeader comment={comment} />
          {
            isEditing ? (
              <div className="comment__edit">
              <textarea 
                value={editedContent} 
                onChange={(e)=>setEditedContent(e.target.value)}
                className="comment__body comment__edit__input"
                style={{paddingLeft: "1.5rem"}}
                rows="3"/>
                <button onClick={onEditComment} className="btn btn--primary">Update</button>
              </div>
            ) : <CommentBody replyTo={comment?.replyingTo} text={comment.content} />
          }
        </div>
        <div className="comment__actions">
          {isOwner ? (
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
                onClick={handleEditClick}
              />
            </>
          ) : (
            <ActionButton
              type="reply"
              icon={`${URL}/images/icon-reply.svg`}
              label="Reply"
              onClick={handleReplyClick}
            />
          )}
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
};

export default CommnetCard;
