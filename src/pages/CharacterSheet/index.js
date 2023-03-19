import React, {useState} from "react";
import "./index.scss";
import { useDrop } from "react-dnd";
import Page from "./Page";
import EditToggle from "./EditToggle";
import AbilityScores from "./CharacterData/AbiltyScores";
import GridTile from "./Page/GridTile";
import { findSectionPercentage } from './utils'
import ModuleSuppply from "./ModuleSupply";

const CharacterSheet = () => {

  const [dragData, setDragData] = useState({})
  const [hoveredSquare, setHoveredSquare] = useState("")
  const [hiddenSupply, toggleHiddenSupply] = useState(true)

  const handleDrop = (x, y, updatedGrid, setGrid) => {
    setDragData({})
    setHoveredSquare("")
  }

  const [, drop] = useDrop(() => ({
    accept: "MODULE",
    drop: () => handleDrop(undefined, undefined, dragData, hoveredSquare)
  }), [dragData, hoveredSquare])

  const handleDrag = ({perX, perY, w, h, id}) => {
    if (!perX){
      setDragData({})
    }
    let countW = findSectionPercentage(w, perX)
    let countH = findSectionPercentage(h, perY)

    setDragData({
      unitsWide: w,
      unitsHigh: h,
      percentageX: countW,
      percentageY: countH,
      id
    })
  }

  return (
    <main ref={drop} id="character-sheet">
      <Page 
        dragData={dragData}
        setDragData={setDragData}
        hoveredSquare={hoveredSquare}
        setHoveredSquare={setHoveredSquare}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
      />
      <ModuleSuppply hiddenSupply={hiddenSupply} toggleHiddenSupply={toggleHiddenSupply} handleDrag={handleDrag}/>
    </main>
  )











  // if the edit button is clicked, enter edit mode
  const [editMode, toggleEditMode] = React.useState(false);
  // if edit mode is true,
  // and you are hovering over where the grid would be,
  // activate hovering, which should display the grid
  // and the plus button to create a new bubble
  const [hovering, toggleHovering] = React.useState(false);
  const [spacing, updateSpacing] = React.useState({
    grids: { w: 12, h: 16 },
    dimensions: {
      h: window.innerHeight,
      w: (window.innerHeight / 11) * 8.5,
    },
    taken: [{ rowS: 2, rowE: 3, colS: 0, colE: 4, name: "ability-score" }],
    areas: [],
  });

  React.useEffect(() => {
    // console.log(spacing.areas.length);
    if (
      !spacing.areas.length ||
      spacing.areas.length !== spacing.grids.h ||
      spacing.areas[0] ||
      spacing.areas[0].length !== spacing.grids.w
    ) {
      let areas = [];
      let count = 0;
      for (let i = 0; i < spacing.grids.h; i++) {
        let row = [];
        for (let j = 0; j < spacing.grids.w; j++) {
          row.push(`square${count}`);
          ++count;
        }
        areas.push(row);
      }
      areas = addTakenFieldsToAreas([...areas]);
      console.log(areas);
      updateSpacing({ ...spacing, areas });
    }
  }, []);

  React.useEffect(() => {
    let areas = [...spacing.areas];
    if (!areas.length) {
      return;
    }
    areas = addTakenFieldsToAreas([...areas]);
    updateSpacing({ ...spacing, areas });
  }, [spacing.taken]);

  const addTakenFieldsToAreas = (areas) => {
    spacing.taken.forEach((x) => {
      for (let i = x.rowS; i <= x.rowE; i++) {
        for (let j = x.colS; j <= x.colE; j++) {
          areas[i][j] = x.name;
        }
      }
    });
    return areas;
  };

  const calcAreas = () => {
    if (!spacing.areas.length) {
      return "";
    }
    let string = "";
    spacing.areas.forEach((x) => {
      string += `'${x.join(" ")}'`;
    });
    return string;
  };

  let style = {
    minHeight: `${spacing.dimensions.h}px`,
    width: `${spacing.dimensions.w}px`,
    gridTemplateRows: `repeat(${spacing.grids.h}, 1fr)`,
    gridTemplateColumns: `repeat(${spacing.grids.w}, 1fr)`,
    gridTemplateAreas: calcAreas(),
  };

  const track = (e) => {
    console.log(e.clientX, e.clientY);
    console.log(e);
    // theres a click event, and a mouse down
    // why both?

    const elementWidthWithoutPadding =
      e.target.parentElement.offsetWidth - window.innerWidth * 0.04;
    const elementHeightWithoutPadding =
      e.target.parentElement.offsetHeight - window.innerWidth * 0.04;

    const space = {
      left: e.target.parentElement.offsetLeft + window.innerWidth * 0.02,
      right:
        e.target.parentElement.offsetLeft +
        e.target.parentElement.offsetWidth -
        window.innerWidth * 0.02,
      top: e.target.parentElement.offsetTop + window.innerWidth * 0.02,
      bottom:
        e.target.parentElement.offsetTop +
        e.target.parentElement.offsetHeight -
        window.innerWidth * 0.02,
    };
    // space finds the borders of the paper, not the square itself
    // console.log(space);

    if (e.target.className === "square") {
      // if you click on a square
      console.log(e.target.outerHTML);
      if (e.clientX >= space.left && e.clientX <= space.right) {
        // and that square is in the horizonal space of the page
        // console.log(
        //   `${
        //     Math.round(
        //       ((e.clientX - space.left) / elementWidthWithoutPadding) * 10000
        //     ) / 100
        //   }% from left side`
        // );
        if (e.clientY >= space.top && e.clientY <= space.bottom) {
          // and that square is in the vertical space of the page
          // console.log(
          //   `${
          //     Math.round(
          //       ((e.clientY - space.top) / elementHeightWithoutPadding) * 10000
          //     ) / 100
          //   }% from top`
          // );
          // let row = Math.floor(
          //   ((e.clientY - space.top) / elementHeightWithoutPadding) *
          //     spacing.grids.h
          // );

          // let col = Math.floor(
          //   ((e.clientX - space.left) / elementWidthWithoutPadding) *
          //     spacing.grids.w
          // );
          let row = null;
          let col = null;
          let areas = [...spacing.areas];

          console.log(e.target);

          for (let i = 0; i < areas.length; i++) {
            if (row === null && col === null) {
              for (let j = 0; j < areas[i].length; j++) {
                if (
                  areas[i][j].includes(e.target.dataset.id) &&
                  row === null &&
                  col === null
                ) {
                  row = i;
                  col = j;
                  break;
                }
              }
            }
          }

          console.log(row, col);
          areas[row][col] = areas[row][col] + "red";
          updateSpacing({ ...spacing, areas });
        }
      }
    } else if (e.target.localName === "section") {
      console.log("bah!");
      let widthOfElement = e.target.offsetWidth / elementWidthWithoutPadding;
      // revist above commented out code for this story
      // to see if you need it, if not, remove it
    }
  };

  const renderGrids = () => {
    return spacing.areas.map((a) => {
      return a.map((b) => {
        if (b.includes("square")) {
          return <GridTile area={b} />;
        }
      });
    });
  };

  return (
    <main style={style} id="base-grid" onClick={track} onMouseDown={track}>
      <EditToggle toggleEditMode={toggleEditMode} editMode={editMode} />
      <AbilityScores />
      {renderGrids()}
    </main>
  );
};

export default CharacterSheet;
