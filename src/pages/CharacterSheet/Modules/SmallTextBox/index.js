import React, { useEffect } from 'react'
import { useDrag } from "react-dnd";

const SmallTextBox = ({handleDrag, data}) => {

	const [{getInitialClientOffset, getInitialSourceClientOffset, isDragging}, drag] = useDrag(() => ({
		type: "MODULE",
		item: {moduleType: "small-text-box"},
		collect: (monitor) => ({
			getInitialClientOffset: monitor.getInitialClientOffset(),
			getInitialSourceClientOffset: monitor.getInitialSourceClientOffset(),
			isDragging: monitor.isDragging(),
		})
	}))

  useEffect(() => {
		if (isDragging){

			let perX = null
			let perY = null
	
			let { width, height } = style
			perX = (getInitialClientOffset.x - getInitialSourceClientOffset.x)/ width
			perY = (getInitialClientOffset.y - getInitialSourceClientOffset.y)/ height
	
			handleDrag({perX, perY, w: 3, h: 2, id: "small-text-box"})
	
		}
	}, [isDragging])

  const style = {
    height: window.innerHeight / 15 * 2 - 10,
    width: window.innerHeight/11 * 8.5 / 12 * 3 -10,
		gridArea: data?.id
  }

  return (
    <div className='module' style={style} ref={drag}>

    </div>
  )
}

export default SmallTextBox