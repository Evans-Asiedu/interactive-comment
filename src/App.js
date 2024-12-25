import React, { Component } from "react";
//import './App.css';

import Form from "./Form";

import Button from "./components/button";

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Form />
        <Button name="yes, delete" onClick={this.handleClick} />
      </>
    );
  }
  handleClick = () => {
    //
  };
}

export default App;
