import React from 'react'
import { BarChart2 } from 'react-feather';
import './BarButton.module.css';
const BarButton = (props) => {
    return (
        <button className="btn-header-bar">
            {props.icon}
            &nbsp;{props.name}
        </button>
    )
}

export default BarButton
