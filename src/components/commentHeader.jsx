const URL = process.env.PUBLIC_URL;

const CommentHeader = function () {
  return (
    <div className="comment__heading">
      <img
        className="comment__user-image"
        src={`${URL}/images/avatars/image-amyrobson.png`}
        alt="the user who puts the comment"
      />
      <h2 className="comment__user-name">amyrobson</h2>
      <p className="comment__created-time">1 month ago</p>
    </div>
  );
};

export default CommentHeader;
