import React from "react";
import Pencil from "../../../pencil.svg";
import "./index.scss";

const EditToggle = ({ toggleEditMode, editMode }) => {
  //add on hover to the div to change the color of the image
  // to catch the eye of users
  // and a click event for the div as well
  // to toggle edit mode

  let style = {};
  if (editMode) {
    style.background = "white";
  }

  return (
    <div
      id="edit-toggle"
      onClick={() => toggleEditMode(!editMode)}
      style={style}
    >
      <img src={Pencil} alt="Pencil" />
    </div>
  );
};

export default EditToggle;
