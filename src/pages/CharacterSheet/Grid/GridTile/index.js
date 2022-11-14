import React from "react";

const GridTile = ({ squareStyle, area }) => {
  const [hover, toggleHover] = React.useState(false);

  // if (hover && editMode) {
  squareStyle = { ...squareStyle, gridArea: area };
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
    <div className="square" style={squareStyle} onClick={renderClick}></div>
  );
};

export default GridTile;
