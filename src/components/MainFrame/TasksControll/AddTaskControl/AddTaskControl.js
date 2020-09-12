import React from 'react'
import { PlusCircle } from 'react-feather'
import { ChevronUp } from 'react-feather'
import { ChevronDown } from 'react-feather'
import './AddTaskControl.module.css'

const AddTaskControl = () => {
    return (
        <div>
            <div className="add-form-container">
                <div className="add-form">
                    <input type="text" placeholder="What are you working on?" className="input-task-name"></input>
                    <p className="est-label">Est Pomodoros</p>
                    <div className="vertical-center-align">
                        <input type="number" min={0} step={1} value={1} className="input-est"></input>
                        <button>
                            <ChevronUp strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem"/>
                        </button>
                        <button style={{marginLeft: '0.5rem'}}>
                            <ChevronDown strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem"/>
                        </button>
                    </div>
                </div>
                <div className="button-action-container">
                    <button className="btn-cancel">Cancel</button>
                    <button className="btn-save">Save</button>
                </div>
            </div>
            <button className="btn-add-task">
                <PlusCircle strokeWidth="0.22rem" />
                <span style={{ paddingLeft: "0.5rem", fontWeight: 'bold', fontSize: "1.2rem" }}>Add Task</span>
            </button>
        </div>

    )
}

export default AddTaskControl
