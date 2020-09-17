import React, { useState, useEffect, useRef } from 'react'
import {ipcRenderer} from 'electron'
import './Login.module.css'
import { User, Key } from 'react-feather'
const Login = (props) => {
    const [user, setUser] = useState({
        userName: "",
        password: "",
    })
    const [invalidAccountMessage, setInvalidAccountMessage] = useState("")

    const loginRef = useRef(null)
    //hanlde when user click outside popup
    useEffect(() => {
        function handleClickOutside(event) {
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                props.setIsDisplayLogin(false)
            }
        }
        if (props.isDisplayLogin) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [props.isDisplayLogin])

    //Switch to sigup page
    const switchToSignupPage = () => {
        props.setIsDisplayLogin(false)
        props.setIsDisplaySignup(true)

    }
    //handle when user change input field
    const onChangeUserInfor = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if (name === "username") {
            const updateUser = { ...user, userName: value };
            setUser(updateUser)
        }
        else if (name === "password") {
            const updateUser = { ...user, password: value };
            setUser(updateUser)
        }
        setInvalidAccountMessage("")
    }

    //handle when user click submit 
    const onSubmitSignUpForm = (e) => {
        e.preventDefault();
        // console.log("Ready to send")
        ipcRenderer.invoke("users:login-user", JSON.stringify({
            userName: user.userName,
            password: user.password
        }))
        //handle if login success
        ipcRenderer.on('users:success-login-user', (e, userId) => {
            props.setUserId(JSON.parse(userId))
            props.setIsDisplayLogin(false)
        })
        //handle error message when login failed
        ipcRenderer.on('users:error-login-user', (e, message) => {
            setInvalidAccountMessage(message)
        })

    }
    return (
        // <React.Fragment></React.Fragment>
        <div className="login-container">
            <div className="behind-layer"></div>
            <section ref={loginRef} className="login-section">
                <div id="wrapper">
                    <div id="login">
                        <form onSubmit={(e) => onSubmitSignUpForm(e)}>
                            <h1>Log in</h1>
                            <div className="after-head-bar"></div>
                            <p style={{ color: "green", display: (props.isSignupSuccess ? "block" : "none") }}>Sign up success, please login to use full services!</p>
                            <p style={{ color: 'red', display: (invalidAccountMessage !== "" ? 'block' : 'none') }}>
                                {invalidAccountMessage} </p>
                            <div>
                                <label >
                                    Your email or username </label>
                                <div className="input-container">
                                    <input
                                        id="username"
                                        name="username"
                                        value={user.userName}
                                        onChange={(e) => onChangeUserInfor(e)}
                                        required="required"
                                        type="text"
                                        placeholder="myusername or mymail@mail.com" />
                                    <span className="icon-user"><User></User></span>
                                </div>

                            </div>
                            <div>
                                <label> Your password </label>
                                <div className="input-container">
                                    <input
                                        id="password"
                                        name="password"
                                        value={user.password}
                                        onChange={(e) => onChangeUserInfor(e)}
                                        required="required"
                                        type="password"
                                        placeholder="eg. X8df!90EO" />
                                    <span><Key></Key></span>
                                </div>
                            </div>
                            <p >
                                <input
                                    type="checkbox"
                                    name="loginkeeping"
                                    id="loginkeeping"
                                    value="loginkeeping" />
                                <label className="ckbox-keep-login">Keep me logged in</label>
                            </p>
                            <p className="login button">
                                <input type="submit" value="Login" />
                            </p>
                        </form>
                    </div>
                </div>
                <div className="change_link">
                    Not a member yet ?
                        <div onClick={switchToSignupPage} >Sign Up</div>
                </div>
            </section>

        </div>
    )
}

export default Login
