import React, { Component } from "react";
import CommnetCard from "./commentCard";
import { getReplies } from "../services/commentService";

const Comments = ({ comments, onAddReply }) => {
  const renderReplyCard = (commentId) => {
    const replies = getReplies(commentId);
    return replies.map((r) => (
      <CommnetCard
        comment={r}
        key={r.id}
        isReply={true}
        onAddReply={onAddReply}
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
          />
          {renderReplyCard(c.id)}
        </>
      ))}
    </div>
  );
};

export default Comments;
