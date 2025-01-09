import data from "./data.json";

export const getComments = () => {
  return data.comments;
};

export const getReplies = (commentId) => {
  const comment = data.comments.find((c) => c.id === commentId);
  return comment ? comment.replies : [];
};

const findCommentIndexPath = (commentsArray, commentId, path = []) => {
  for (let i = 0; i < commentsArray.length; i++) {
    const comment = commentsArray[i];
    if (comment.id === commentId) {
      return [...path, i]; // Found the comment, return its path
    }
    if (comment.replies && comment.replies.length > 0) {
      const result = findCommentIndexPath(comment.replies, commentId, [...path, i]);
      if (result) return result; // Return if found in replies
    }
  }
  return null; // Return null if not found
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

export const editComment = (commentId, editedContent) => {
  const commentIndexPath = findCommentIndexPath(data.comments, commentId);
  console.log(commentIndexPath);
  
  if (data.comments[commentIndexPath[0]].replies.length > 0 ){
    const editedComment = data.comments[commentIndexPath[0]].replies[commentIndexPath[1]];
    editedComment.content = editedContent;

    data.comments[commentIndexPath[0]].replies[commentIndexPath[1]] = editedComment;
  } else {
    const editedComment = data.comments[commentIndexPath[0]];
    editedComment.content = editedContent;

    data.comments[commentIndexPath[0]] = editedComment;
  }

  return data.comments;
};
