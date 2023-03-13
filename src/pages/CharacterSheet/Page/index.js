import React, { useState, useEffect } from "react";
import "./index.scss";
import GridTile from "./GridTile";
import { validPlacement, removeElementFromGrid, removeElementFromModules, renderModule } from "./utils";


const Page = ({dragData, setDragData, hoveredSquare, setHoveredSquare, handleDrag}) => {
  // const [selectedGridTile, toggleSelectedGridTile] = React.useState(null);

  const rowSquares = 15;
  const colSquares = 12;

  // const gridRender = () => {
  //   const grid = [];
  //   for (let i = 0; i < rowSquares * colSquares; i++) {
  //     grid.push(
  //       <GridTile
  //         index={i}
  //         editMode={editMode}
  //         toggleSelectedGridTile={toggleSelectedGridTile}
  //         selectedGridTile={selectedGridTile}
  //       />
  //     );
  //   }
  //   return grid;
  // };

  const [grid, setGrid] = useState([])
  const [modules, setModules] = useState([])

  // useEffect to track and color squares if they are valid placements for modules while grabbed
  useEffect(() => {
    if (Object.keys(dragData).length && !!hoveredSquare){
      //TODO: x determines which row its in, so it is not the x value
        // same for y, it determines how far from the left it is, so it is not the y value
      const [x, y] = findEmptyBoxIndex(hoveredSquare)

      let cleanGrid = [...grid].map(a => {
        return a.map(b => {
          return {...b, valid: 0}
        })
      })
      cleanGrid = removeElementFromGrid(dragData.id, cleanGrid)

      const [validSquares, valid] = validPlacement(cleanGrid, dragData, {x, y})
      
      let updatedGrid = [...cleanGrid].map((a, i) => {
        return a.map((b, j) => {
          if (validSquares.includes(b.id) && valid){
            return {...b, valid: 1}
          } else if (validSquares.includes(b.id) && !valid){ 
            return {...b, valid: -1}
          } else {
            return {...b, valid: 0}
          }
        })
      })

      setGrid(updatedGrid)
    }
  }, [dragData, hoveredSquare])

  // mounting useEffect, fills all spaces on page with grids
  useEffect(() => {
    if (!grid.length){
      let updatedGrid = []
      let count = 0
      for (let i = 0; i < rowSquares; i++) {
        let row = [];
        for (let j = 0; j < colSquares; j++) {
          row.push({id: `square${count}`, valid: 0});
          ++count;
        }
        updatedGrid.push(row);
      }
      setGrid(updatedGrid)
    }
  }, [])

  const handleHover = (id) => {
    setHoveredSquare(id)
  }

  const handleDrop = (item) => {
    console.log(item)
    if (isValid()){
      let count = countOfThisComponent(item)
      let id = `${item.moduleType}${count}`
      if (item.id){
        let [rowStart, rowEnd, colStart, colEnd] = findValidIndices()
        let updateModules = [...modules].map(box => {
          if (box.id === item.id){
            return {...box, data: {...box.data, rowStart, rowEnd, colStart, colEnd}}
          } else {
            return box
          }
        })
        setModules(updateModules)
      } else {
        let [rowStart, rowEnd, colStart, colEnd] = findValidIndices()
        const data = {rowStart, rowEnd, colStart, colEnd, id}
        setModules([...modules, {...item, data}])
      }
      // this would move the new component, but it wouldnt clear out the old component in the grid array :/
      let updatedGrid = item.coordinates ? removeElementFromGrid(item.id, [...grid]) : [...grid]
      let [rowStart, rowEnd, colStart, colEnd] = findValidIndices()
      updatedGrid = updatedGrid.map((a, i) => {
        return a.map((b, j) => {
          if (i >= colStart && i <= colEnd && j >= rowStart && j <= rowEnd){
            return {id: `${item.id || id}`}
          } else {return b}
        })
      })
      setGrid(updatedGrid)
    } 
    setDragData({})
    setHoveredSquare("")
  }

  const findEmptyBoxIndex = (id) => {
    let x = null
    let y = null
    
    for (let i = 0; i < rowSquares; i++) {
      for (let j = 0; j < colSquares; j++) {
        if (!grid[i][j]){
          debugger
        }
        if (grid[i][j].id === id){
          x = i
          y = j
        }
      }
    }
    return [x, y]
  }

  const findValidIndices = () => {
    let indices = []
    for (let i=0; i < rowSquares; i++){
      for (let j=0; j < colSquares; j++){
        if (grid[i][j].valid === 1){
          indices.push(j)
          indices.push(indices[0] + dragData.unitsWide - 1)
          indices.push(i)
          indices.push(indices[2] + dragData.unitsHigh - 1)
          break
        }
      }
    }

    return indices
  }

  // TODO: this is wrong! it should find the element with the highest index at the end, and use that +1
  const countOfThisComponent = (item) => {
    return modules.filter(b => b.element === item.element).length
  }

  const isValid = () => {
    let validSquares = dragData.unitsWide * dragData.unitsHigh
    grid.forEach(a => {
      a.forEach(b => {
        if (b.valid === 1){
          validSquares--
        }
      })
    })

    return validSquares === 0
  }

  const calcGrid = () => {
    if (!grid.length) {
      return "";
    }
    let string = "";
    grid.forEach((x) => {
      let justArea = x.map(a => a.id)
      string += `'${justArea.join(" ")}'`;
    });
    return string;
  };

  const removeElement = (id) => {
    setGrid(removeElementFromGrid(id, grid))
    setModules(removeElementFromModules(id, modules))
  }

  const renderGrid = () => {
    console.log(grid)
    return grid.map((a, col) => {
      return a.map((b, row) => {
        if (b.id.includes("square")) {
          return <GridTile data={b} handleDrop={handleDrop} modules={modules} handleHover={handleHover} dragData={dragData} grid={grid}/>;
        } else if (b.id.includes("box")){
          if (row != 0 && grid[col][row-1].id === b.id){
            return
          }
          if (col != 0 && grid[col-1][row].id === b.id){
            return
          }
          let module = modules.find(box => box.data.colStart === col && box.data.rowStart === row)
          // let coordinates = {rowStart, rowEnd, colStart, colEnd}
          return renderModule(module)
          // return <Box id={id} color={color} h={h} w={w} area={b.id} handleDrag={handleDrag} element={element} coordinates={coordinates} removeElement={removeElement}/>
        }
      });
    });
  }

  let style = {
    // height: window.innerHeight,
    // width: (window.innerHeight / 11) * 8.5,
    gridTemplateAreas: calcGrid()
  }

  return (
    <div id="page" style={style}>
      {renderGrid()}
    </div>
  );
};

export default Page;