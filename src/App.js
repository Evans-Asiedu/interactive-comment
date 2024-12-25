import React, { Component } from "react";
//import './App.css';
import Button from "./components/button";

class App extends Component {
  state = {};

  // Handle button click event
  handleClick = () => {
    //
  };

  render() {
    return <Button name="yes, delete" onClick={this.handleClick} />;
  }
}

export default App;
