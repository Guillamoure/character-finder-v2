import React, { useState, useEffect } from "react";
import "./index.scss";
import SmallTextBox from "../Modules/SmallTextBox";

const ModuleSuppply = ({hiddenSupply, toggleHiddenSupply, handleDrag}) => {

  const renderSupply = () => {
    if (hiddenSupply){
      return <button id="supply-button" onClick={() => toggleHiddenSupply(false)}>+</button>
    } else {
      return (
        <div>
          <SmallTextBox handleDrag={handleDrag}/>
        </div>
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