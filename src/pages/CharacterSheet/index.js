import React from 'react'
import './index.scss'
import Grid from './Grid'

const CharacterSheet  = () => {

    let style = {
        height: `${window.innerHeight}`,
        width: `${(window.innerHeight/11)* 8.5}px`
    }


    return (
        <main style={style}><Grid width={style.width}/></main>
    )
}

export default CharacterSheet