import ModuleContainer from "../Modules/ModuleContainer"
import { Constants } from "../Modules/constants"
import SmallTextBox from "../Modules/SmallTextBox"


export const validPlacement = (grid, {unitsHigh, unitsWide, percentageX, percentageY}, {x, y}) => {
  let valid = true
  let validSquares = []
  if (grid[x][y].id.includes("square")){

    if (!(unitsWide === 1 && unitsHigh === 1 && grid[x][y].id.includes("square"))){
      
      let topLeft = {row: y - percentageX + 1, col: x - percentageY + 1}

      for(let i = topLeft.col; i < topLeft.col + unitsHigh; i++){

        for(let j = topLeft.row; j < topLeft.row + unitsWide; j++){

          if (grid[i] && grid[i][j] && grid[i][j].id.includes("square")){
            validSquares.push(grid[i][j].id)
          } else {
            valid = false
          }

        }
      }
    } else {           
      validSquares.push(grid[x][y].id)
    }
  }
return [validSquares, valid]  
}

export const removeElementFromGrid = (id, grid) => {
// let {rowStart, rowEnd, colStart, colEnd} = coordinates
let count = 0
return [...grid].map((a, i) => {
  return a.map((b, j) => {
    if (id === b.id){
      return {id: `square${count++}`, valid: 0}
    } else {
      count++
      return b
    }
  })
})
}

export const removeElementFromModules = (id, modules) => {
  return [...modules].filter(module => id !== module.id)
}

export const renderModule = (module) => {
  switch(module.moduleType){
    case "smallTextBox":
      return <SmallTextBox data={module}/>
  }
}

