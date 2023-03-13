import React, { useEffect } from 'react'
import { useDrag } from "react-dnd";
import { Constants } from '../constants';

const ModuleContainer = (props) => {
  
  const {handleDrag, id, moduleType} = props
  const {w, h} = Constants[moduleType]
  
	const [{getInitialClientOffset, getInitialSourceClientOffset, isDragging}, drag] = useDrag(() => ({
		type: "MODULE",
		item: {moduleType, id},
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
	
			handleDrag({perX, perY, w, h, id})
	
		}
	}, [isDragging])

  const style = {
    height: window.innerHeight / 15 * h - 10,
    width: window.innerHeight/11 * 8.5 / 12 * w -10,
		gridArea: id
  }

  return (
    <div className='module' style={style} ref={drag}>
      {props.children}
    </div>
  )
}

export default ModuleContainer