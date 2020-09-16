import React, { useState } from 'react'
import { X } from 'react-feather'
import './TimerSetting.module.css'

const TimerSetting = (props) => {
    const [originalPomodoroSetting, setOriginalPomodoroSetting] = useState(props.pomodoroSetting)
    const [pomodoroSetting, setPomodoroSetting] = useState(props.pomodoroSetting)
    const changeSetting = (e) => {
        if (e.target.name === 'pomo') {
            setPomodoroSetting({
                ...pomodoroSetting,
                pomoTime: +e.target.value
            })
        }
        else if (e.target.name === 'short-break') {
            setPomodoroSetting({
                ...pomodoroSetting,
                shortBreakTime: +e.target.value
            })
        }
        else if (e.target.name === 'long-break') {
            setPomodoroSetting({
                ...pomodoroSetting,
                longBreakTime: +e.target.value
            })
        }
        else if (e.target.name === 'long-break-interval') {
            setPomodoroSetting({
                ...pomodoroSetting,
                longBreakInterval: +e.target.value
            })
        }
    }
    const saveSetting = () => {
        const isPomoTimeSettingChanged = originalPomodoroSetting.pomoTime !== pomodoroSetting.pomoTime;
        const isShortBreakTimeSettingChanged = originalPomodoroSetting.shortBreakTime !== pomodoroSetting.shortBreakTime;
        const isLongBreakTimeSettingChanged = originalPomodoroSetting.longBreakTime !== pomodoroSetting.longBreakTime;
        props.setChangedSetting({
            pomoTime: isPomoTimeSettingChanged,
            shortBreakTime: isShortBreakTimeSettingChanged,
            longBreakTime: isLongBreakTimeSettingChanged
        })

        props.setPomodoroSetting({ ...pomodoroSetting })
        props.setIsDisplaySetting(false)
    }
    return (
        <div className={"timer-setting"}>
            <div className="editting-timer-setting">
                <div className="header-txt">
                    <span>TIMER SETTING</span>
                    <span onClick={() => {
                        props.setIsDisplaySetting(false)
                    }} style={{ cursor: "pointer" }}><X size="1.8rem" strokeWidth="0.2rem"></X></span>
                </div>
                <div className='edit-item-container'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Time (minutes)</h3>
                    <div className="edit-items">
                        <div>
                            <p>Pomodoro</p>
                            <input type="number"
                                min={1}
                                step={1}
                                name="pomo"
                                value={pomodoroSetting.pomoTime}
                                onChange={(e) => changeSetting(e)}
                            ></input>
                        </div>
                        <div>
                            <p>Short Break</p>
                            <input type="number"
                                step={1}
                                min={1}
                                name="short-break"
                                value={pomodoroSetting.shortBreakTime}
                                onChange={(e) => changeSetting(e)}
                            ></input>
                        </div>
                        <div>
                            <p>Long Break</p>
                            <input type="number"
                                step={1}
                                min={1}
                                name="long-break"
                                value={pomodoroSetting.longBreakTime}
                                onChange={(e) => changeSetting(e)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className='edit-item-container edit-items'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Auto start next round?</h3>
                    <div
                        className={"checkbox-icon" + (props.autoContinue ? " checkbox-icon-toggle-on" : "")}
                        onClick={() => {
                            props.setAutoContinue(!props.autoContinue)
                        }}
                    >
                        <div>

                        </div>
                    </div>
                </div>

                <div className='edit-item-container edit-items'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Sound Volume</h3>
                    <div>
                        <p style={{ marginRight: "0.6rem" }}>50</p>
                        <input type="range" min="0" max="100" className="slider"></input>
                    </div>
                </div>
                <div className='edit-item-container edit-items'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Long Break interval</h3>
                    <input type="number"
                        min={1}
                        step={1}
                        name="long-break-interval"
                        value={pomodoroSetting.longBreakInterval}
                        onChange={(e) => changeSetting(e)}
                    ></input>
                </div>
                <div className='edit-item-container edit-items'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Dark Mode when running</h3>
                    <div className="checkbox-icon">
                        <div>

                        </div>
                    </div>
                </div>
                <div className='edit-item-container edit-items'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Notification</h3>
                    <div>
                        <select name="notifyAt" className="sltNotifyAt">
                            <option value="last">Last</option>
                            <option value="every">Every</option>
                        </select>
                        <input type="number" step={1} value="5" onChange={() => { }}></input>
                        <p style={{ marginLeft: '0.5rem', color: '#222', fontWeight: 'normal' }}> min</p>
                    </div>
                </div>
            </div>
            <div className="btn-container-timer-setting">
                <button onClick={() => saveSetting()}>OK</button>
            </div>
        </div>
    )
}

export default TimerSetting
