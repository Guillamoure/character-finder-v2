import React from "react";

const GridTile = ({ squareStyle, area }) => {
  const [hover, toggleHover] = React.useState(false);

  // if (hover && editMode) {
  squareStyle = {
    ...squareStyle,
    gridArea: area,
    backgroundColor: area.includes("red") ? "red" : "",
  };
  // }

  // const canHover = !selectedGridTile;

  const renderClick = () => {
    //   if (editMode) {
    //     if (selectedGridTile === index) {
    //       toggleSelectedGridTile(null);
    //     } else {
    //       toggleSelectedGridTile(index);
    //     }
    //   }
  };

  return (
    <div
      className="square"
      style={squareStyle}
      onClick={renderClick}
      data-id={area.replace("square", "")}
    ></div>
  );
};

export default GridTile;
