import React, { useState, useEffect } from "react";
import "./index.scss";
import SmallTextBox from "../Modules/SmallTextBox";
import ModuleContainer from "../Modules/ModuleContainer";

const ModuleSuppply = ({hiddenSupply, toggleHiddenSupply, handleDrag}) => {

  const renderSupply = () => {
    if (hiddenSupply){
      return <button id="supply-button" onClick={() => toggleHiddenSupply(false)}>+</button>
    } else {
      return (
        <ModuleContainer handleDrag={handleDrag} moduleType={"smallTextBox"}>
          <SmallTextBox/>
        </ModuleContainer>
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