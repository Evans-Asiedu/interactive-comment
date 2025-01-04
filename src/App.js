import React, { Component } from "react";
//import './App.css';

import ActionButton from "./components/actionButton";
import CommentBody from "./components/commentBody";
import Button from "./components/button";
import CommentHeader from "./components/commentHeader";
import AddCommentForm from "./components/addCommentForm";
import VotingButton from "./components/voting";
import { addComment, getComments } from "./services/commentService";
import CommnetCard from "./components/commentCard";

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
    console.log("content", content);
    addComment(content);
    this.setState({});
  };

  render() {
    const { comments } = this.state;

    return (
      <>
        <div className="app">
          <div className="comments">
            {comments.map((c) => (
              <CommnetCard comment={c} key={c.id} />
            ))}
            <AddCommentForm onAddComment={this.handleAddComment} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
