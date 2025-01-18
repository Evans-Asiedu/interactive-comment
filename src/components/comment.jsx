import React from "react";
import { getReplies } from "../services/commentService";
import CommentCard from "./commentCard";

const Comments = ({ comments, onAddReply, onEdit, onDelete }) => {
  const renderReplyCard = (commentId) => {
    const replies = getReplies(commentId);
    return replies.map((r) => (
      <CommentCard
        key={r.id}
        comment={r}
        isReply={true}
        onAddReply={onAddReply}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ));
  };

  return (
    <div className="comments">
      {comments.map((c) => (
        <React.Fragment key={c.id}>
          <CommentCard
            key={c.id}
            comment={c}
            isReply={false}
            onAddReply={onAddReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          {renderReplyCard(c.id)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Comments;
