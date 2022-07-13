import React from "react";

const GridTile = ({ editMode, squareStyle }) => {
  const [hover, toggleHover] = React.useState(false);

  if (hover && editMode) {
    squareStyle = { ...squareStyle, background: "black" };
  }

  return (
    <div
      className="square"
      style={squareStyle}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    ></div>
  );
};

export default GridTile;
