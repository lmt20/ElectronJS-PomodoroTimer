import React, { useState, useEffect, useRef } from 'react'
import {ipcRenderer} from 'electron'
import './Signup.module.css'
import { User, Key, Mail } from 'react-feather'
const Signup = (props) => {
    const [user, setUser] = useState({
        userName: "",
        mail: "",
        password: "",
        confirmPassword: ""
    })
    const [invalidInputMessage, setInvalidInputMessage] = useState("")
    const signupRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (signupRef.current && !signupRef.current.contains(event.target)) {
                props.setIsDisplaySignup(false)
            }
        }
        if (props.isDisplaySignup) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [props.isDisplayLogin])
    const switchToLoginPage = () => {
        props.setIsDisplaySignup(false)
        props.setIsDisplayLogin(true)
    }
    const onChangeUserInfor = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name === "username"){
            const updateUser = {...user, userName: value};
            setUser(updateUser)
        }
        else if(name === "mail"){
            const updateUser = {...user, mail: value};
            setUser(updateUser)
        }
        else if(name === "password"){
            const updateUser = {...user, password: value};
            setUser(updateUser)
        }
        else if(name === "confirm-password"){
            const updateUser = {...user, confirmPassword: value};
            setUser(updateUser)
        }
        setInvalidInputMessage("")
    }
    const checkValidInput = () => {
        return user.password === user.confirmPassword;
    }
    const onSubmitSignUpForm = (e) => {
        e.preventDefault(); 
        if(checkValidInput()){
            // console.log("Ready to send")
            ipcRenderer.invoke("users:create-user", JSON.stringify({
                userName: user.userName, 
                mail: user.mail,
                password: user.password
            }))
            //handle if creating success
            ipcRenderer.on('users:complete-create-user', (e, userId) => {
                // console.log(userId)
                props.setIsSignupSuccess(true)
                props.setIsDisplaySignup(false)
                props.setIsDisplayLogin(true)
            })
            //handle error message when checking in server db
            ipcRenderer.on('users:error-create-user', (e, message) => {
                setInvalidInputMessage(message)
            })
        }
        else {
            setInvalidInputMessage("Confirm Password isn't correct!");
        }
        
    }
    return (
        // <React.Fragment></React.Fragment>
        <div className="login-container">
            <div className="behind-layer"></div>
            <section ref={signupRef} className="signup-section">
                <div id="wrapper">
                    <div id="SignUp">
                        <form onSubmit={e => onSubmitSignUpForm(e)}>
                            <h1>Resgister</h1>
                            <div className="after-head-bar"></div>
                            <p style={{color: 'red', display: (invalidInputMessage !== "" ? 'block' : 'none')}}>
                                {invalidInputMessage} </p>
                            <div>
                                <label >
                                    Your username </label>
                                <div className="input-container">
                                    <input
                                        id="username"
                                        name="username"
                                        // value={user.userName !== "" ? user.userName : ""}
                                        value={user.userName}
                                        onChange={(e) => onChangeUserInfor(e)}
                                        required="required"
                                        type="text"
                                        placeholder="yourusername" />
                                    <span className="icon-user"><User></User></span>
                                </div>
                            </div>
                            <div>
                                <label >
                                    Your email </label>
                                <div className="input-container">
                                    <input
                                        id="mail"
                                        name="mail"
                                        value={user.mail}
                                        onChange={(e) => onChangeUserInfor(e)}
                                        required="required"
                                        type="text"
                                        placeholder="yourmail@mail.com" />
                                    <span><Mail></Mail></span>
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
                            <div>
                                <label> Please confirm your password </label>
                                <div className="input-container">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        value={user.confirmPassword}
                                        onChange={(e) => onChangeUserInfor(e)}
                                        required="required"
                                        type="password"
                                        placeholder="eg. X8df!90EO" />
                                    <span><Key></Key></span>
                                </div>
                            </div>

                            <p className="logout button">
                                <input type="submit" value="Sign Up" />
                            </p>
                        </form>
                    </div>
                </div>
                <div className="change_link">
                    Already a member ?
                    <div onClick={switchToLoginPage} >Login</div>
                </div>
            </section>

        </div>
    )
}

export default Signup
