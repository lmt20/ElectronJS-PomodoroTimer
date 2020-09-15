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
                 name="Report"></BarButton>
                <BarButton 
                tab={props.tab} 
                icon={<Settings size="1rem" />} 
                name="Setting"></BarButton >
                <BarButton 
                tab={props.tab} 
                icon={<User size="1rem" />} 
                name="Login"></BarButton>
            </span>
        </div>
    )
}

export default NavigationBar
