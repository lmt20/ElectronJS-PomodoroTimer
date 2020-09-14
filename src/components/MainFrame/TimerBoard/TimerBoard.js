import React, { useState, useEffect, useRef } from 'react'
import TimerTypeButton from './TimerTypeButton/TimerTypeButton'
import './TimerBoard.module.css'

const TimerBoard = (props) => {
    const pomodoroSetting = props.pomodoroSetting;
    const { pomoTime, shortBreakTime, longBreakTime, longBreakInterval } = props.pomodoroSetting;
    const [isRunning, setIsRunning] = useState(false)
    const [timer, setTimer] = useState({
        type: "pomo",
        beginTime: Date.now(),
        minutes: pomoTime,
        seconds: 0
    })

    const timeoutID = useRef(null);

    const changeRunningStatus = () => {
        setIsRunning(!isRunning)
    }

    useEffect(() => {
        if (isRunning) {
            timeoutID.current = setTimeout(() => {
                if (timer.seconds === 0) {
                    setTimer({
                        ...timer,
                        seconds: 59,
                        minutes: timer.minutes - 1
                    })
                } else {
                    setTimer({
                        ...timer,
                        seconds: timer.seconds - 1,
                    })
                }
            }, 1000)
        }
        return () => {
            clearTimeout(timeoutID.current)
        }


    }, [timer, isRunning])

    const switchTab = (type) => {
        if (type !== timer.type) {
            if (type === 'short-break') {
                props.setTab('short-break')
                setIsRunning(false)
                setTimer({
                    type,
                    beginTime: Date.now(),
                    minutes: shortBreakTime,
                    seconds: 0
                })
            }
            else if (type === 'long-break') {
                props.setTab('long-break')
                setIsRunning(false)
                setTimer({
                    type,
                    beginTime: Date.now(),
                    minutes: longBreakTime,
                    seconds: 0
                })
            }
            if (type === 'pomo') {
                props.setTab('pomo')
                setIsRunning(false)
                setTimer({
                    type,
                    beginTime: Date.now(),
                    minutes: pomoTime,
                    seconds: 0
                })
            }
        }
    }
    return (
        <React.Fragment>
            <div className={"time-board" + (timer.type === 'short-break' ? " timerboard-background__short-break--color" : "")
            + (timer.type === 'long-break' ? " timerboard-background__long-break--color" : "")
        }>
                <div>
                    <div className="buttons-header">
                        <TimerTypeButton
                            type="pomo"
                            name="Pomodoro"
                            selected={timer.type === "pomo"}
                            switchTab={switchTab}
                        ></TimerTypeButton>
                        <TimerTypeButton
                            type="short-break"
                            name="Short Break"
                            selected={timer.type === "short-break"}
                            switchTab={switchTab}
                        ></TimerTypeButton>
                        <TimerTypeButton
                            type="long-break"
                            name="Long Break"
                            selected={timer.type === "long-break"}
                            switchTab={switchTab}
                        ></TimerTypeButton>
                    </div>
                    <div style={{ fontSize: "7.5rem", letterSpacing: '0.25rem', textAlign: "center", fontWeight: "bolder", fontFamily: "Arial-Rounded", margin: "1.5rem 0" }}>
                        {timer.minutes < 10 ? '0' + timer.minutes : timer.minutes}
                        :{timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}
                    </div>
                    <button className={"btn-start-working" + (isRunning ? "" : " paused")
                + (timer.type === 'short-break' ? " btn-text__short-break--color" : "")
                + (timer.type === 'long-break' ? " btn-text__long-break--color" : "")    
                }
                     onClick={changeRunningStatus}>{isRunning ? "STOP" : 'START'}
                     </button>
                    <p>&nbsp;</p>
                </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '1.2rem', margin: '2rem 3rem' }}>
                <p style={{ fontSize: '0.9rem', opacity: '0.6', display: props.startingNotify ? 'none' : 'block' }}>WORKNG ON</p>
                <p >{props.statusLabel}</p>
            </div>
        </React.Fragment>
    )
}

export default TimerBoard
