import React, { useState } from 'react'

const SmallTextBox = ({data}) => {
	const [header, setHeader] = useState("Header")
	const [body, setBody] = useState("Insert Text Here")

	const headerStyle = {
		width: "80%",
		border: "none",
		backgroundColor: "transparent",
		fontWeight: "400",
		margin:	"auto"
	}

	const bodyStyle = {
		resize: "none",
		width: "-webkit-fill-available",
		fontSize: "smaller",
		backgroundColor: "transparent",
		border: "none"
	}

	const handleHeader = (e) => {
		let text = e.target.value || "Header"
		setHeader(text)
	}

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
			<input type="text" value={header} onChange={handleHeader} style={headerStyle} disabled={!data ? "disabled": ""}/>
			<textarea type="text" value={body} onChange={e => setBody(e.target.value)} style={bodyStyle} disabled={!data ? "disabled": ""} rows="5"/>
    </div>
  )
}

export default SmallTextBox