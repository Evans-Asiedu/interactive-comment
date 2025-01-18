import React, { Component } from "react";
import AddCommentForm from "./components/addCommentForm";
import Comments from "./components/comment";
import {
  addComment,
  addReply,
  editComment,
  getComments,
  removeComment,
} from "./services/commentService";

//const URL = process.env.PUBLIC_URL;

class App extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    const comments = getComments();
    this.setState({ comments });
  }

  // for handling adding of comment
  handleAddComment = (content) => {
    const newComment = addComment(content);
    const comments = [...this.state.comments, newComment];
    console.log("comments", comments);
    this.setState({ comments });
  };

  // for handling replies
  handleAddReply = (commentId, replyContent, replyingTo) => {
    const newReply = addReply(commentId, replyContent, replyingTo);
    const comments = [...this.state.comments];
    comments.find((c) => {
      if (c.id === commentId) {
        c.replies.push(newReply);
        return c;
      }
    });

    this.setState({ comments });
  };

  handleEditComment = (commentId, newContent) => {
    const editedComments = editComment(commentId, newContent);
    // Update state
    this.setState({ comments: editedComments });
  };

  handleDelete = (commentId) => {
    removeComment(commentId);

    const comments = [...this.state.comments];

    const updatedComments = comments.filter((comment) => {
      if (comment.id === commentId) {
        return false;
      }

      comment.replies = comment.replies.filter(
        (reply) => reply.id !== commentId
      );

      return true;
    });

    this.setState({ comments: updatedComments });
  };

  render() {
    const { comments } = this.state;

    return (
      <div className="app">
        {/* <div className="scrollable-content"> */}
        <Comments
          comments={comments}
          onAddReply={this.handleAddReply}
          onEdit={this.handleEditComment}
          onDelete={this.handleDelete}
        />
        {/* </div> */}
        <div id="add-comment-container">
          <AddCommentForm onAddComment={this.handleAddComment} />
        </div>
      </div>
    );
  }
}

export default App;
