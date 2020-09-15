import React, { useState } from 'react'
import { BarChart2 } from 'react-feather';
import SettingFrame from '../../SettingFrame/SettingFrame';
import './BarButton.module.css';
const BarButton = (props) => {
    const [isDisplaySetting, setIsDisplaySetting] = useState(false)
    const clickBtn = () => {
        if (props.name === "Setting" && !isDisplaySetting) {
            setIsDisplaySetting(true)
        }
    }
    return (
        <React.Fragment>
            <button className={"btn-header-bar"
                + (props.tab === "short-break" ? " btn-header-bar--short-break" : "")
                + (props.tab === "long-break" ? " btn-header-bar--long-break" : "")
            }
                onClick={clickBtn}
            >
                {props.icon}
                &nbsp;{props.name}

            </button>
            {isDisplaySetting ? <SettingFrame pomodoroSetting={props.pomodoroSetting}
                setPomodoroSetting={props.setPomodoroSetting}
                setChangedSetting={props.setChangedSetting}
                isDisplaySetting={isDisplaySetting}
                setIsDisplaySetting={setIsDisplaySetting}></SettingFrame> : ""}
        </React.Fragment>
    )
}
export default BarButton
