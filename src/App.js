import React, { Component } from "react";
//import './App.css';

import ActionButton from "./components/actionButton";
import CommentBody from "./components/commentBody";
import Button from "./components/button";
import CommentHeader from "./components/commentHeader";
import AddCommentForm from "./components/addCommentForm";
import VotingButton from "./components/voting";
import { getComments } from "./services/commentService";

const URL = process.env.PUBLIC_URL;

class App extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    const comments = getComments();
    this.setState({ comments });
  }

  render() {
    const { comments } = this.state;
    console.log("comments", comments);

    return (
      <>
        {comments.map((c) => (
          <CommentBody replyTo={c.user.username} text={c.content} />
        ))}
      </>
    );
  }
  handleClick = () => {
    //
  };
}

export default App;
