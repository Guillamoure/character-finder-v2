import React from "react";
import "./index.scss";
import Grid from "./Grid";
import EditToggle from "./EditToggle";
import AbilityScores from "./CharacterData/AbiltyScores";
import GridTile from "./Grid/GridTile";

const CharacterSheet = () => {
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
    console.log(spacing.areas.length);
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
    console.log(string);
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
    const elementWidthWithoutPadding =
      e.target.offsetWidth - window.innerWidth * 0.04;
    const elementHeightWithoutPadding =
      e.target.offsetHeight - window.innerWidth * 0.04;
    const space = {
      left: e.target.offsetLeft + window.innerWidth * 0.02,
      right:
        e.target.offsetLeft + e.target.offsetWidth - window.innerWidth * 0.02,
      top: e.target.offsetTop + window.innerWidth * 0.02,
      bottom:
        e.target.offsetTop + e.target.offsetHeight - window.innerWidth * 0.02,
    };
    console.log(space);
    if (e.target.id === "base-grid") {
      console.log(e.target.id);
      if (e.clientX >= space.left && e.clientX <= space.right) {
        console.log(
          `${(e.clientX - space.left) / elementWidthWithoutPadding}%`
        );
        if (e.clientY >= space.top && e.clientY <= space.bottom) {
          console.log(
            `${(e.clientY - space.top) / elementHeightWithoutPadding}%`
          );
        }
      }
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
    <main style={style} id="base-grid" onClick={track}>
      <EditToggle toggleEditMode={toggleEditMode} editMode={editMode} />
      <AbilityScores />
      {renderGrids()}
    </main>
  );
};

export default CharacterSheet;
