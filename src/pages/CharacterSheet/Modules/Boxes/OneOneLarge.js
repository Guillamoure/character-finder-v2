import React, { useState } from 'react'
import "./index.scss"

const OneOneLarge = () => {

  const [text, setText] = useState("Text")

  return (
    <div className="one-one" style={{padding: "23% 0"}}>
      <input type="text" style={{fontSize: "large"}} value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default OneOneLarge