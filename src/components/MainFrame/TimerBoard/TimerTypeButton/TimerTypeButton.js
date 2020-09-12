import React from 'react'
import './TimerTypeButton.module.css'

const TimerTypeButton = (props) => {
    return (
        <a className={'timer-type' + " " + props.selected} >
            {props.name}
        </a>
    )
}

export default TimerTypeButton
