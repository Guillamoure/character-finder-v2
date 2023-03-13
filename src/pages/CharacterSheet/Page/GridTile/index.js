import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

const GridTile = ({ data, handleDrop, grid, modules, dragData, handleHover }) => {

  const [{isOver, getItem}, drop] = useDrop(() => ({
    accept: "MODULE",
    drop: (item) => handleDrop(item, data.id),
    collect: (monitor) => ({
      getItem: monitor.getItem(),
      isOver: monitor.isOver()
    })
  }), [modules, dragData, grid])

  useEffect(() => {
    if (isOver){
      handleHover(data.id)
    }
  }, [isOver])

  const squareStyle = {
    gridArea: data.id,
    height: window.innerHeight / 15,
    width: window.innerHeight/11 * 8.5 / 12,
  };

  if (Object.keys(dragData).length) {
    if (data.valid === 1){
      squareStyle.backgroundColor = "lightgreen"
    } else if (data.valid === -1) {
      squareStyle.backgroundColor = "lightpink"
    }
  }

  return (
    <div
      className="square"
      style={squareStyle}
      ref={drop}
    >
      
    </div>
  );
};

export default GridTile;
