import React, { useState, useEffect } from "react";
import "./index.scss";
import SmallTextBox from "../Modules/Boxes/SmallTextBox";
import ModuleContainer from "../Modules/ModuleContainer";
import PathfinderAbilityScores from "../Modules/PathfinderAbilityScores";
import OneOneSmall from "../Modules/Boxes/OneOneSmall";
import OneOneMedium from "../Modules/Boxes/OneOneMedium";
import OneOneLarge from "../Modules/Boxes/OneOneLarge";

const ModuleSuppply = ({hiddenSupply, toggleHiddenSupply, handleDrag}) => {

  const renderSupply = () => {
    if (hiddenSupply){
      return <button id="supply-button" onClick={() => toggleHiddenSupply(false)}>+</button>
    } else {
      return (
        <>
          <ModuleContainer handleDrag={handleDrag} moduleType={"smallTextBox"}>
            <SmallTextBox/>
          </ModuleContainer>
          <ModuleContainer handleDrag={handleDrag} moduleType={"pathfinderAbilityScores"}>
            <PathfinderAbilityScores/>
          </ModuleContainer>
          <ModuleContainer handleDrag={handleDrag} moduleType={"box1x1Small"}>
            <OneOneSmall/>
          </ModuleContainer>
          <ModuleContainer handleDrag={handleDrag} moduleType={"box1x1Medium"}>
            <OneOneMedium/>
          </ModuleContainer>
          <ModuleContainer handleDrag={handleDrag} moduleType={"box1x1Large"}>
            <OneOneLarge/>
          </ModuleContainer>
          <button id="supply-button" style={{width: "90%", bottom: "5%", fontSize: "1.1em"}} onClick={() => toggleHiddenSupply(true)}>Close Modules</button>
        </>
      )
    }
  
  }

  let id = hiddenSupply ? "module-supply-button" : "module-supply"

  return (
    <aside id={id} >
      {renderSupply()}
    </aside>
  )
}

export default ModuleSuppply