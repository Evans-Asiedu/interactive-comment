import data from "./data.json";
import { getFromLocalStorage, saveToLocalStorage } from "./storageService";

export const populateLocalStorage = () => {
  saveToLocalStorage("comments", data.comments);
};

export const getComments = () => {
  const storedComments = getFromLocalStorage("comments") || [];
  if (storedComments.length === 0) populateLocalStorage();
  return storedComments;
};

export const getReplies = (commentId) => {
  const storedComments = getFromLocalStorage("comments") || [];
  const comment = storedComments.find((c) => c.id === commentId);
  return comment ? comment.replies : [];
};

const findCommentIndexPath = (commentsArray, commentId, path = []) => {
  for (let i = 0; i < commentsArray.length; i++) {
    const comment = commentsArray[i];
    if (comment.id === commentId) {
      return [...path, i]; // Found the comment, return its path
    }
    if (comment.replies && comment.replies.length > 0) {
      const result = findCommentIndexPath(comment.replies, commentId, [
        ...path,
        i,
      ]);
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

  // data.comments.push(newComment);

  const storedComments = getFromLocalStorage("comments") || [];
  saveToLocalStorage("comments", [...storedComments, newComment]);

  return newComment;
};

export const addReply = (commentId, content, replyingTo) => {
  const storedComments = getFromLocalStorage("comments") || [];

  const newReply = {
    id: Date.now(),
    content,
    createdAt: "Just now",
    score: 0,
    replyingTo,
    user: data.currentUser,
  };

  storedComments.find((c) => {
    if (c.id === commentId) {
      c.replies.push(newReply);
      return c;
    }
  });

  saveToLocalStorage("comments", storedComments);

  return newReply;
};

export const removeComment = (id) => {
  const storedComments = getFromLocalStorage("comments") || [];
  const commentIndex = storedComments.findIndex((c) => c.id === id);
  console.log("first called comments", storedComments);
  if (commentIndex !== -1) {
    storedComments.splice(commentIndex, 1);
    console.log("second remove comments:", storedComments);
    saveToLocalStorage("comments", storedComments);
    return true;
  }

  storedComments.map((comment) => {
    const replyIndex = comment.replies.findIndex((r) => r.id === id);
    if (replyIndex !== -1) {
      comment.replies.splice(replyIndex, 1);
      saveToLocalStorage("comments", storedComments);
      return true;
    }
  });

  return false;
};

export const editComment = (commentId, editedContent) => {
  const storedComments = getFromLocalStorage("comments") || [];

  const commentIndexPath = findCommentIndexPath(storedComments, commentId);
  console.log(commentIndexPath);

  if (storedComments[commentIndexPath[0]].replies.length > 0) {
    storedComments[commentIndexPath[0]].replies[commentIndexPath[1]].content =
      editedContent;
    saveToLocalStorage("comments", storedComments);
  } else {
    storedComments[commentIndexPath[0]].content = editedContent;
    saveToLocalStorage("comments", storedComments);
  }

  return storedComments;
};
