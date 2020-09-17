import React from 'react'
import { CheckCircle } from 'react-feather';
import { BarChart2 } from 'react-feather';
import { Settings } from 'react-feather';
import { User } from 'react-feather';
import BarButton from './BarButton/BarButton';
import './NavigationBar.module.css';


const NavigationBar = (props) => {
    return (
        <div className="flexbox-container">
            <a className="icon-header-area"><CheckCircle /> <span className="header-text"> Pomofocus</span></a>
            <span>
                <BarButton 
                    tab={props.tab} 
                    icon={<BarChart2 size="1rem" />}
                    name="Report"
                    type="Report"
                />
                <BarButton 
                    pomodoroSetting={props.pomodoroSetting}
                    setPomodoroSetting={props.setPomodoroSetting}
                    setChangedSetting={props.setChangedSetting}
                    tab={props.tab} 
                    icon={<Settings size="1rem" />} 
                    name="Setting"
                    type="Setting"
                    autoContinue={props.autoContinue}
                    setAutoContinue={props.setAutoContinue}
                    user={props.user}
                />
                <BarButton 
                    tab={props.tab} 
                    icon={<User size="1rem" />} 
                    name={props.isLogin ? props.user.userName : "Login"}
                    type="Login"
                    setUser={props.setUser}
                    setIsLogin={props.setIsLogin}
                />
            </span>
        </div>
    )
}

export default NavigationBar
