import React from 'react'
import {PlusCircle} from 'react-feather'
import './AddTaskControl.module.css'

const AddTaskControl = () => {
    return (
        <button className="btn-add-task">
            <PlusCircle strokeWidth="0.22rem" />
            <span style={{paddingLeft: "0.5rem", fontWeight: 'bold', fontSize: "1.2rem"}}>Add Task</span>
        </button>
    )
}

export default AddTaskControl
