import React, {useState, useRef, useEffect} from 'react'
import './SettingFrame.module.css'
import TimerSetting from './TimerSetting/TimerSetting'
const SettingFrame = (props) => {
    const timeSettingRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (timeSettingRef.current && !timeSettingRef.current.contains(event.target)) {
                props.setIsDisplaySetting(false)
            }
        }
        if (props.isDisplaySetting) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [props.isDisplaySetting])
    return (
        <div className={"setting-container"}>
            <div className="behind-layer"></div>
            <div ref={timeSettingRef}>
                <TimerSetting setIsDisplaySetting={props.setIsDisplaySetting}>   
    
                </TimerSetting>
            </div>
        </div>
    )
}   

export default SettingFrame
