import React from "react";
import "./index.scss";
import GridTile from "./GridTile";

const Grid = ({ editMode }) => {
  const [selectedGridTile, toggleSelectedGridTile] = React.useState(null);

  const rowSquares = 16;
  const colSquares = 12;

  // const hover = () => {
  //   if (editMode) {
  //     squareStyle.background = "tan";
  //   }
  // };

  const gridRender = () => {
    const grid = [];
    for (let i = 0; i < rowSquares * colSquares; i++) {
      grid.push(
        <GridTile
          index={i}
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
