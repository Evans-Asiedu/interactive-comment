import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import data from "../services/data.json";
import ActionButton from "./actionButton";
import AddCommentForm from "./addCommentForm";
import CommentBody from "./commentBody";
import CommentHeader from "./commentHeader";
import Dialog from "./dialog";
import VotingButton from "./voting";

const URL = process.env.PUBLIC_URL;
const currentUser = data.currentUser;

const CommnetCard = ({ comment, isReply, onAddReply, onEdit, onDelete }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleAddReply = (replyContent) => {
    const updatedReplyContent = replyContent.replace(
      `@${comment.user.username} `,
      ""
    );
    onAddReply(comment.id, updatedReplyContent, comment.user.username);
    setShowReplyForm(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const onEditComment = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setShowReplyForm(false);
    setEditedContent(comment.content);
  };
  const commentRef = useRef(null);
  useOutsideClick(commentRef, cancelEdit);

  const handleDeleClick = () => {
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log("confirm delete called");
    onDelete(comment.id);
    setShowDeleteDialog(false);
  };

  const isOwner = comment.user.username === currentUser.username;

  return (
    <>
      <article
        className={isReply ? "comment comment--reply" : "comment"}
        // ref={commentRef}
      >
        <VotingButton />

        <div style={{ width: "100%" }}>
          <CommentHeader comment={comment} />
          {isEditing ? (
            <div className="comment__edit">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="comment__body comment__edit__input"
                style={{ paddingLeft: "1.5rem" }}
                rows="3"
              />
              <button onClick={onEditComment} className="btn btn--primary">
                Update
              </button>
            </div>
          ) : (
            <CommentBody replyTo={comment?.replyingTo} text={comment.content} />
          )}
        </div>
        <div className="comment__actions">
          {isOwner ? (
            <>
              <ActionButton
                type="delete"
                icon={`${URL}/images/icon-delete.svg`}
                label="Delete"
                onClick={handleDeleClick}
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
      {/* Delete confirmation dialog  */}
      {showDeleteDialog && (
        <div className="delete-dialog">
          {" "}
          <Dialog
            title={"Delete Comment"}
            content={
              "Are you sure you want to Delete this comments? This will remove the comment and can't be undone"
            }
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
          />
        </div>
      )}
    </>
  );
};

export default CommnetCard;
