import React, { Component } from "react";
//import './App.css';
import ActionButton from "./components/actionButton";

import CommentBody from "./components/commentBody";
import Button from "./components/button";
import AddCommentForm from "./components/addCommentForm";
import CommentHeader from "./components/commentHeader";

const URL = process.env.PUBLIC_URL;

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <AddCommentForm />
        <CommentHeader />
        <Button name="yes, delete" onClick={this.handleClick} />

        <div class="comment__actions">
          <ActionButton
            type="delete"
            icon={`${URL}/images/icon-delete.svg`}
            label="Delete"
            onClick={this.handleClick}
          />
          <ActionButton
            type="edit"
            icon={`${URL}/images/icon-edit.svg`}
            label="Edit"
            onClick={this.handleClick}
          />
          <ActionButton
            type="reply"
            icon={`${URL}/images/icon-reply.svg`}
            label="Reply"
            onClick={this.handleClick}
          />
        </div>

        <CommentBody
          replyTo="amyrobson"
          text="Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've 
        nailed the design and the responsiveness at various breakpoints works really well."
        />
      </>
    );
  }
  handleClick = () => {
    //
  };
}

export default App;
