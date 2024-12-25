const URL = process.env.PUBLIC_URL;

const AddCommentForm = function () {
  return (
    <form className="add-comment">
      <img
        className="comment__user-image"
        src={`${URL}/images/avatars/image-amyrobson.png`}
        alt="the user who puts the comment"
      />

      <input
        type="text"
        className="add-comment__comment-input"
        placeholder="Add a comment..."
      />

      <button>Send</button>
    </form>
  );
};

export default AddCommentForm;