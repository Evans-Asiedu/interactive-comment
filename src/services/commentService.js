import data from "./data.json";

export const getComments = () => {
  return data.comments;
};

export const getReplies = (commentId) => {
  const comment = data.comments.find((c) => c.id === commentId);
  return comment ? comment.replies : [];
};

export const addComment = (content) => {
  const newComment = {
    id: Date.now(),
    content,
    createdAt: "just now",
    score: 0,
    user: data.currentUser,
    replies: [],
  };

  data.comments.push(newComment);
  return newComment;
};

export const addReply = (commentId, content, replyingTo) => {
  const comment = data.comments.find((c) => c.id === commentId);
  if (!comment) return null;

  const newReply = {
    id: Date.now(),
    content,
    createdAt: "Just now",
    score: 0,
    replyingTo,
    user: data.currentUser,
  };

  comment.replies.push(newReply);
  return newReply;
};

export const removeComment = (id) => {
  const commentIndex = data.comments.findIndex((c) => c.id === id);
  if (commentIndex !== -1) {
    data.comments.splice(commentIndex, 1);
    return true;
  }

  for (const comment of data.comments) {
    const replyIndex = comment.replies.findIndex((r) => r.id === id);
    if (replyIndex !== -1) {
      comment.replies.splice(replyIndex, 1);
      return true;
    }
  }

  return false;
};
