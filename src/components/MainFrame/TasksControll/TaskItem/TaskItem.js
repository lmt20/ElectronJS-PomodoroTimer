import React from 'react'
import {CheckCircle} from 'react-feather'
import {MoreVertical} from 'react-feather'
import './TaskItem.module.css'

const TaskItem = (props) => {
    return (
        <button className={"task-item-control" + " " + props.isSelecting} onClick={() => props.clickTaskItemButton(props._id, props.name)}>
            <div className={"align-vertical-content"}>
                <span onClick={() => props.clickTaskItemIcon(props._id)}><CheckCircle color="#fff" size="2rem" style={{backgroundColor: props.isCompleted ? '#F05B56' : "#DFDFDF", borderRadius: "50%"}} /></span>
                <span className={"task-name" + (props.isCompleted ? " text-completed" : "") }>{props.name}</span>
            </div>
            <div className="align-vertical-content">
                <span style={{color: '#BBB', fontWeight: 'bolder', fontSize: '1.4rem'}}>{props.completedIntervalNum}/
                <span style={{fontSize: '1.3rem'}}>{props.settedIntervalNum}</span></span>
                <MoreVertical size="2rem" className="more-vertical-icon"/>
            </div>
        </button>
    )
}

export default TaskItem
