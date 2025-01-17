import React, { Component } from "react";
//import './App.css';

import AddCommentForm from "./components/addCommentForm";
import Comments from "./components/comment";
import {
  addComment,
  addReply,
  editComment,
  getComments,
  removeComment,
} from "./services/commentService";
import { saveToLocalStorage } from "./services/storageService";

const URL = process.env.PUBLIC_URL;

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
    addComment(content);
    const updatedComments = getComments();
    this.setState({ comments: updatedComments });
  };

  // for handling replies
  handleAddReply = (commentId, replyContent, replyingTo) => {
    addReply(commentId, replyContent, replyingTo);
    const updatedComments = getComments();
    this.setState({ comments: updatedComments });
  };

  handleEditComment = (commentId, newContent) => {
    const updatedComments = editComment(commentId, newContent);
    this.setState({ comments: updatedComments });
  };

  handleDelete = (commentId) => {
    removeComment(commentId);

    this.setState({ comments: getComments() });
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
