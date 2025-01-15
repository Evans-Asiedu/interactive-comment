import React, { useRef } from "react";
import Button from "./button";
import useOutsideClick from "../hooks/useOutsideClick";

const Dialog = ({ title, content, onCancelDelete, onConfirmDelete }) => {
  const dialogRef = useRef(null)

  const onClose = ()=> {
    onCancelDelete()
  }
  useOutsideClick(dialogRef, onClose)

  return (
    <div className="dialog__content" ref={dialogRef}>
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
