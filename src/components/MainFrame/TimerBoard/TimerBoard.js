import React, { useState, useEffect, useRef } from 'react'
import TimerTypeButton from './TimerTypeButton/TimerTypeButton'
import './TimerBoard.module.css'

const TimerBoard = (props) => {
    const pomodoroSetting = props.pomodoroSetting;
    const [originalTime, setOriginalTime ] = useState(pomodoroSetting)
    const [isRunning, setIsRunning] = useState(false)
    const [timer, setTimer] = useState({
        type: "pomo",
        beginTime: Date.now(),
        minutes: pomodoroSetting.pomoTime,
        seconds: 0
    })

    const timeoutID = useRef(null);

    const changeRunningStatus = () => {
        setIsRunning(!isRunning)
    }
    const isUpdateInTab = () => {
        let isUpdateInsideTab = false;
        if(timer.type === "pomo") isUpdateInsideTab = props.changedSetting.pomoTime;
        else if(timer.type === "short-break") isUpdateInsideTab = props.changedSetting.shortBreakTime;
        else if(timer.type === "long-break") isUpdateInsideTab = props.changedSetting.longBreakTime;
        return isUpdateInsideTab;
    }
    const getTargetTime = (type) => {
        let originalTargetTime;
        if(type === "pomo"){
            originalTargetTime = originalTime.pomoTime;
            let newTargetTime = pomodoroSetting.pomoTime;
            let spannedTime = originalTargetTime * 60 - timer.minutes*60 - timer.seconds;
            let newCurrentTargetTime = newTargetTime * 60 - spannedTime;
            if(newCurrentTargetTime > 0){
                return newCurrentTargetTime;
            }
            else{
                if(props.numInterval < pomodoroSetting.longBreakInterval -1){
                    props.setNumInterval(props.numInterval + 1)
                    props.completeCurrentTask()
                    props.setTab('short-break')
                }
                else {
                    props.setNumInterval(0)
                    props.setTab('long-break')            
                }
            }
        }
        if(type === "short-break"){
            originalTargetTime = originalTime.shortBreakTime;
            let newTargetTime = pomodoroSetting.shortBreakTime;
            let spannedTime = originalTargetTime * 60 - timer.minutes*60 - timer.seconds;
            let newCurrentTargetTime = newTargetTime * 60 - spannedTime;
            if(newCurrentTargetTime > 0){
                return newCurrentTargetTime;
            }
            else{
                props.startNextTask()
                props.setTab('pomo')
            }
        }
        if(type === "long-break"){
            originalTargetTime = originalTime.longBreakTime;
            let newTargetTime = pomodoroSetting.longBreakTime;
            let spannedTime = originalTargetTime * 60 - timer.minutes*60 - timer.seconds;
            let newCurrentTargetTime = newTargetTime * 60 - spannedTime;
            if(newCurrentTargetTime > 0){
                return newCurrentTargetTime;
            }
            else{
                props.startNextTask()
                props.setTab('pomo')
            }
        }

    }

    const getCurrentSettingTime = () => {
        if(timer.type === "pomo") return pomodoroSetting.pomoTime;
        if(timer.type === "short-break") return pomodoroSetting.shortBreakTime;
        if(timer.type === "long-break") return pomodoroSetting.longBreakTime;
    }
    useEffect(() => {        
        if(isUpdateInTab()){
            setTimer({
                ...timer,
                beginTime: Date.now(),
                minutes: Math.floor(getTargetTime(timer.type)/60),
                seconds: getTargetTime(timer.type) % 60
            })
        } else {
            setTimer({
                ...timer,
                beginTime: Date.now(),
                minutes: getCurrentSettingTime(),
                seconds: 0
            })
        }
        setOriginalTime(pomodoroSetting)
    }, [props.pomodoroSetting])
    
    useEffect(() => {
        switchTab(props.tab)
    }, [props.tab])

    const handleCountdownDone = () => {
        if(timer.type === 'pomo'){
            if(props.numInterval < pomodoroSetting.longBreakInterval -1){
                props.setNumInterval(props.numInterval + 1)
                props.completeCurrentTask()
                props.setTab('short-break')
            }
            else {
                props.completeCurrentTask()
                props.setNumInterval(0)
                props.setTab('long-break')            
            }
        }
        else if(timer.type === 'short-break' || timer.type === 'long-break'){
            props.startNextTask()
            props.setTab('pomo')
        }
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
                if(timer.minutes === 0 && timer.seconds === 0){
                    handleCountdownDone()
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
                if(!props.autoContinue) setIsRunning(false)
                setTimer({
                    type,
                    beginTime: Date.now(),
                    minutes:  pomodoroSetting.shortBreakTime,
                    seconds: 0
                })
            }
            else if (type === 'long-break') {
                props.setTab('long-break')
                if(!props.autoContinue) setIsRunning(false)
                setTimer({
                    type,
                    beginTime: Date.now(),
                    minutes: pomodoroSetting.longBreakTime,
                    seconds: 0
                })
            }
            if (type === 'pomo') {
                props.setTab('pomo')
                if(!props.autoContinue) setIsRunning(false)
                setTimer({
                    type,
                    beginTime: Date.now(),
                    minutes: pomodoroSetting.pomoTime,
                    seconds: 0
                })
            }
        }
    }

    //get %time span
    const getPercentTimeSpan = () => {
        return Math.floor((1-(timer.minutes*60 + timer.seconds)/(getCurrentSettingTime()*60)) * 10000)/100
    }
    return (
        <React.Fragment>
            <div className={isRunning ? "time-progress-bar" : "time-progress-bar--hidden"}>
                <div style={{width: getPercentTimeSpan()+"%"}}></div>
            </div>
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
