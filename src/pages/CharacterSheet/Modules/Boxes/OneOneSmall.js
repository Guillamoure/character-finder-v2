import React, { useState } from 'react'
import "./index.scss"

const OneOneSmall = () => {

  const [text, setText] = useState("Text")

  return (
    <div className="one-one" style={{padding: "30% 0"}}>
      <input type="text" style={{fontSize: "small"}} value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default OneOneSmall