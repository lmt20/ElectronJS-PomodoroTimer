import React, { useState } from 'react'
import { BarChart2, LogIn } from 'react-feather';
import Login from '../../Login/Login';
import SettingFrame from '../../SettingFrame/SettingFrame';
import Signup from '../../Signup/Signup';
import './BarButton.module.css';
const BarButton = (props) => {
    const [isDisplaySetting, setIsDisplaySetting] = useState(false)
    const [isDisplayLogin, setIsDisplayLogin] = useState(false)
    const [isDisplaySignup, setIsDisplaySignup] = useState(false)
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)
    const clickBtn = () => {
        if (props.type === "Setting" && !isDisplaySetting) {
            setIsDisplaySetting(true)
        }
        else if (props.type === "Login" && !isDisplayLogin) {
            setIsDisplayLogin(true)
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
                setIsDisplaySetting={setIsDisplaySetting}
                autoContinue={props.autoContinue}
                setAutoContinue={props.setAutoContinue}
                user={props.user}
                ></SettingFrame> : ""}
            {isDisplayLogin ? <Login
                isDisplayLogin={isDisplayLogin}
                setIsDisplayLogin={setIsDisplayLogin}
                setIsDisplaySignup={setIsDisplaySignup}
                setUser={props.setUser}
                isSignupSuccess={isSignupSuccess}
                setIsSignupSuccess={setIsSignupSuccess}
                setIsLogin={props.setIsLogin}
             /> : ""}
            {isDisplaySignup ? <Signup
                isDisplaySignup={isDisplaySignup}
                setIsDisplaySignup={setIsDisplaySignup}
                setIsDisplayLogin={setIsDisplayLogin}
                setIsSignupSuccess={setIsSignupSuccess}
             /> : ""}

        </React.Fragment>
    )
}
export default BarButton
