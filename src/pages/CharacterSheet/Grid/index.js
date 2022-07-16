import React from "react";
import "./index.scss";
import GridTile from "./GridTile";

const Grid = ({ width, editMode }) => {
  const [selectedGridTile, toggleSelectedGridTile] = React.useState(null);

  const rowSquares = 20;
  const colSquares = 14;

  const squareStyle = {
    height: `${window.innerHeight / rowSquares - 2}px`,
    width: `${parseInt(width) / colSquares - 2}px`,
  };
  console.log(width);

  const hover = () => {
    if (editMode) {
      squareStyle.background = "tan";
    }
  };

  const gridRender = () => {
    const grid = [];
    for (let i = 0; i < rowSquares * colSquares; i++) {
      grid.push(
        <GridTile
          index={i}
          squareStyle={squareStyle}
          editMode={editMode}
          toggleSelectedGridTile={toggleSelectedGridTile}
          selectedGridTile={selectedGridTile}
        />
      );
    }
    return grid;
  };

  return <div id="grid">{gridRender()}</div>;
};

export default Grid;
