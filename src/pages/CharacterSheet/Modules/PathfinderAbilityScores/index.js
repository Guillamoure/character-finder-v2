import React, { useState } from 'react'
import './index.scss'
import { pluser, mod } from '../utils'

const PathfinderAbilityScores = ({data}) => {
	const [abilityScores, setAbilityScores] = useState({str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 })

  const keys = ["str", "dex", "con", "int", "wis", "cha"]

  const handleAbilityScores = (key, value) => {
    setAbilityScores({...abilityScores, [key]: value})
  }

  const renderAbilityScores = () => {
    return keys.map((key, i) => {
      const value = abilityScores[key]
      const onChange = (e) => handleAbilityScores(key, e.target.value)
      return (
        <div className="pathfinder-ability-scores-row">
          <label className="pathfinder-ability-scores-name">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input type="number" className="clean-number-input pathfinder-ability-scores" value={value} onChange={onChange} />
          <div className="pathfinder-ability-scores-mod">{pluser(mod(value))}</div>
        </div>
      )
    })
  }

  return (
    <div>
      <div style={{display: "flex"}}>
        <div style={{textAlign: "center", width: "30%", fontSize: "12px"}}>Name</div>
        <div style={{textAlign: "center", width: "40%", fontSize: "12px"}}>Score</div>
        <div style={{textAlign: "center", width: "30%", fontSize: "12px"}}>Mod</div>
      </div>
      {renderAbilityScores()}
    </div>
  )
}

export default PathfinderAbilityScores