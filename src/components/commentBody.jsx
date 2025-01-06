const CommentBody = ({ text, replyTo }) => {
  return (
    <p className="comment__body">
      {replyTo ? <span className="comment__reply-to">@{replyTo} </span> : null}
      {text}
    </p>
  );
};

export default CommentBody;
