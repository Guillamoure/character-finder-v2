import React from "react";

const GridTile = ({
  index,
  editMode,
  squareStyle,
  toggleSelectedGridTile,
  selectedGridTile,
}) => {
  const [hover, toggleHover] = React.useState(false);

  if (hover && editMode) {
    squareStyle = { ...squareStyle, background: "black" };
  }

  const canHover = !selectedGridTile;

  const renderClick = () => {
    if (editMode) {
      if (selectedGridTile === index) {
        toggleSelectedGridTile(null);
      } else {
        toggleSelectedGridTile(index);
      }
    }
  };

  return (
    <div
      className="square"
      style={squareStyle}
      onMouseEnter={() => canHover && toggleHover(true)}
      onMouseLeave={() => canHover && toggleHover(false)}
      onClick={renderClick}
    ></div>
  );
};

export default GridTile;
