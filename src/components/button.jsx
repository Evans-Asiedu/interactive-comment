import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <button className="btn btn--primary" onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
