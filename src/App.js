import React, { Component } from "react";
//import './App.css';

import Button from "./components/button";
import AddCommentForm from "./components/addCommentForm";

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <AddCommentForm />
        <Button name="yes, delete" onClick={this.handleClick} />
      </>
    );
  }
  handleClick = () => {
    //
  };
}

export default App;
