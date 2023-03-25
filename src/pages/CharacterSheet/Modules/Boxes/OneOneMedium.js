import React, { useState } from 'react'
import "./index.scss"

const OneOneMedium = () => {

  const [text, setText] = useState("Text")

  return (
    <div className="one-one"  style={{padding: "26% 0"}}>
      <input type="text" style={{fontSize: "medium"}} value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default OneOneMedium