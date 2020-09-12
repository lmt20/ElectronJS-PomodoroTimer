import React from 'react'
import { MoreVertical } from 'react-feather';
import './HeaderControl.module.css';

const HeaderControl = () => {
    return (
        <div className="header-control">
            <span>Tasks</span>
            <MoreVertical style={{backgroundColor: "#F16965", padding: "3px 4px", borderRadius:"0.3rem"}} size="2rem"/>
        </div>
    )
}

export default HeaderControl
