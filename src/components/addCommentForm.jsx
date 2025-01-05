import React, { useState } from "react";
import Button from "./button";

const URL = process.env.PUBLIC_URL;

const AddCommentForm = ({ onAddComment, initialValue = "" }) => {
  const [comment, setComment] = useState(initialValue);

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(comment.trim()); // further raise the on add comment event
      setComment("");
    }
  };

  return (
    <form
      className="add-comment"
      onSubmit={(e) => {
        e.preventDefault(); // prevent form reload on submit
        handleAddComment();
      }}
    >
      <img
        className="comment__user-image_in_form"
        src={`${URL}/images/avatars/image-amyrobson.png`}
        alt="the user who puts the comment"
      />

      <input
        type="text"
        className="add-comment__comment-input"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)} //update state on input change
      />

      <Button name="send" onClick={() => handleAddComment} />
    </form>
  );
};

export default AddCommentForm;
