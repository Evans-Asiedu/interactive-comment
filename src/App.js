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

    const commentIndex = comments.findIndex((c) => c.id === commentId);
    if (commentIndex !== -1) {
      comments.splice(commentIndex, 1);
    } else {
      comments.map((comment) => {
        const replyIndex = comment.replies.findIndex((r) => r.id === commentId);
        if (replyIndex !== -1) {
          comment.replies.splice(replyIndex, 1);
        }
      });
    }

    this.setState({ comments });
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
