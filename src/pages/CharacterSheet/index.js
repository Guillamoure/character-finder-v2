import React from "react";
import "./index.scss";
import Grid from "./Grid";
import EditToggle from "./EditToggle";

const CharacterSheet = () => {
  // if the edit button is clicked, enter edit mode
  const [editMode, toggleEditMode] = React.useState(false);
  // if edit mode is true,
  // and you are hovering over where the grid would be,
  // activate hovering, which should display the grid
  // and the plus button to create a new bubble
  const [hovering, toggleHovering] = React.useState(false);

  let style = {
    height: `${window.innerHeight}`,
    width: `${(window.innerHeight / 11) * 8.5}px`,
  };

  return (
    <main style={style}>
      <Grid width={style.width} />
      <EditToggle toggleEditMode={toggleEditMode} editMode={editMode} />
    </main>
  );
};

export default CharacterSheet;
