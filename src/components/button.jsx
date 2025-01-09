import React from "react";

const Button = ({ name, onClick, classname }) => {
  return (
    <button className={classname} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
