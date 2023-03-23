import React from 'react'
import './index.scss'
import { useDrop } from "react-dnd";


const Trash = ({dragData, modules, removeModule}) => {

  const handleDrop = () => {
    removeModule({data: {id: dragData.id}}, dragData.page)
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: "MODULE",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), [modules, dragData])

  return (
    <aside id="discard-module" ref={drop}>
      Discard Module
    </aside>
  )
}

export default Trash