import React from 'react'
import './TimerTypeButton.module.css'

const TimerTypeButton = (props) => {
    return (
        <span>
            <a className={'timer-type'
            + (props.selected && props.type === "pomo" ? ' tab__pomo--selected' : "")
            + (props.selected && props.type === "short-break" ? ' tab__short-break--selected' : "")
            + (props.selected && props.type === "long-break" ? ' tab__long-break--selected' : "")
        }
              onClick={() => props.switchTab(props.type)}>
                {props.name}
            </a>
        </span>
    )
}

export default TimerTypeButton
