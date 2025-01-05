const URL = process.env.PUBLIC_URL;

const CommentHeader = function ({comment}) {
  return (
    <div className="comment__heading">
      <img
        className="comment__user-image"
        src={comment.user.image.webp}
        alt="Username"
      />
      <h2 className="comment__user-name">{comment.user.username}</h2>
      <p className="comment__created-time">{comment.createdAt}</p>
    </div>
  );
};

export default CommentHeader;
