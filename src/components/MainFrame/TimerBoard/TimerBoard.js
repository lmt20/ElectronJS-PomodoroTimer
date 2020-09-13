import React, {useState} from 'react'
import TimerTypeButton from './TimerTypeButton/TimerTypeButton'
import TimerDisplay from './TimerDisplay/TimerDisplay'
import './TimerBoard.module.css'

const TimerBoard = (props) => {
    const [currentStatus, setCurrentStatus] = useState("pomo")
    
    const pomodoroSetting = props.pomodoroSetting;
    const {pomoTime, shortBreakTime, longBreakTime,longBreakInterval } = props.pomodoroSetting;
    const targetTime = (() => {
        if(currentStatus === "pomo"){
            return pomoTime
        }
        else if(currentStatus === "short-break"){
            return shortBreakTime
        }
        else if(currentStatus === "long-break"){
            return longBreakTime
        }
    })();
    // const [targetTime, setTargetTime] = useState(25)
    // if(currentStatus === "pomo"){
    //     setTargetTime
    // }

    return (
        <React.Fragment>
            <div className="time-board">
                <div>
                    <div className="buttons-header">
                        <TimerTypeButton name="Pomodoro" selected="timer-type-selected"></TimerTypeButton>
                        <TimerTypeButton name="Short Break"></TimerTypeButton>
                        <TimerTypeButton name="Long Break"></TimerTypeButton>
                    </div>
                    <TimerDisplay targetTime={targetTime}></TimerDisplay>
                    <button className="btn-start-working">START</button>
                    <p>&nbsp;</p>
                </div>
            </div>
        <div style={{textAlign: 'center', fontSize: '1.2rem', margin: '2rem 3rem'}}>
            <p style={{fontSize: '0.9rem', opacity: '0.6', display: props.startingNotify ? 'none': 'block'}}>WORKNG ON</p>
            <p >{props.statusLabel}</p>
        </div>
        </React.Fragment>
    )
}

export default TimerBoard
