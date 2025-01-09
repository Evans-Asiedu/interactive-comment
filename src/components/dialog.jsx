import React from "react";
import Button from "./button";

const Dialog = ({ title, content, onCancelDelete, onConfirmDelete }) => {
  return (
    <div className="dialog__content">
      <h3>{title}</h3>
      <p className="text">{content}</p>
      <div className="dialog__button">
        <Button
          name="No, Cancel"
          onClick={onCancelDelete}
          classname={"btn btn--secondary"}
        />
        <Button
          name="Yes, Delete"
          onClick={onConfirmDelete}
          classname={"btn btn--accent"}
        />
      </div>
    </div>
  );
};

export default Dialog;
