import React, { Component } from "react";
//import './App.css';

import ActionButton from "./components/actionButton";
import CommentBody from "./components/commentBody";
import Button from "./components/button";
import CommentHeader from "./components/commentHeader";
import AddCommentForm from "./components/addCommentForm";
import VotingButton from "./components/voting";
import { addComment, getComments, addReply, editComment } from "./services/commentService";
import CommnetCard from "./components/commentCard";
import Comments from "./components/comment";

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
  }

  render() {
    const { comments } = this.state;

    return (
      <>
        <div className="app">
          <div className="scrollable-content">
            <Comments comments={comments} onAddReply={this.handleAddReply} onEdit={this.handleEditComment} />
          </div>
          <AddCommentForm onAddComment={this.handleAddComment} />
        </div>
      </>
    );
  }
}

export default App;
