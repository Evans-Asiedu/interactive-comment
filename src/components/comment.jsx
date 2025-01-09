import React from "react";
import { getReplies } from "../services/commentService";
import CommnetCard from "./commentCard";

const Comments = ({ comments, onAddReply, onEdit, onDelete }) => {
  const renderReplyCard = (commentId) => {
    const replies = getReplies(commentId);
    return replies.map((r) => (
      <CommnetCard
        comment={r}
        key={r.id}
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
        <>
          <CommnetCard
            comment={c}
            key={c.id}
            isReply={false}
            onAddReply={onAddReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          {renderReplyCard(c.id)}
        </>
      ))}
    </div>
  );
};

export default Comments;
