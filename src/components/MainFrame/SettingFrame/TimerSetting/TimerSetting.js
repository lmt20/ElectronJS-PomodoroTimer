import React from 'react'
import { X } from 'react-feather'
import './TimerSetting.module.css'

const TimerSetting = (props) => {
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
                            <input type="number" step={1} value="25"></input>
                        </div>
                        <div>
                            <p>Short Break</p>
                            <input type="number" step={1} value="5"></input>
                        </div>
                        <div>
                            <p>Long Break</p>
                            <input type="number" step={1} value="15"></input>
                        </div>
                    </div>
                </div>
                <div className='edit-item-container edit-items'>
                    <h3 style={{ marginBottom: '0.3rem' }}>Auto start next round?</h3>
                    <div className="checkbox-icon">
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
                    <input type="number" step={1} value="4"></input>
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
                        <input type="number" step={1} value="5"></input>
                        <p style={{ marginLeft: '0.5rem', color: '#222', fontWeight: 'normal' }}> min</p>
                    </div>
                </div>
            </div>
            <div className="btn-container-timer-setting">
                <button onClick={() => {
                    props.setIsDisplaySetting(false)
                }}>OK</button>
            </div>
        </div>
    )
}

export default TimerSetting
