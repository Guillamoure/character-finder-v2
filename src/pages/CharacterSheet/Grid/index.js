import React from "react";
import "./index.scss";

const Grid = ({ width }) => {
  const rowSquares = 20;
  const colSquares = 14;

  const grid = [];
  const squareStyle = {
    height: `${window.innerHeight / rowSquares - 2}px`,
    width: `${parseInt(width) / colSquares - 2}px`,
  };
  console.log(width);
  for (let i = 0; i < rowSquares * colSquares; i++) {
    grid.push(<div className="square" style={squareStyle}></div>);
  }

  return <div id="grid">{grid}</div>;
};

export default Grid;
