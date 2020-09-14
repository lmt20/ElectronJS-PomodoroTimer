import React, { useState } from 'react'
import { CheckCircle, ChevronUp, ChevronDown } from 'react-feather'
import { MoreVertical } from 'react-feather'
import './TaskItem.module.css'
import './EditForm.module.css'

const TaskItem = (props) => {
    const [edittingTask, setEdittingTask] = useState({
        name: props.task.name,
        settedIntervalNum: props.task.settedIntervalNum
    })
    const changeTaskName = (e) => {
        const name = e.target.value;
        setEdittingTask({ ...edittingTask, name })
    }
    const changeEstTask = (e) => {
        const settedIntervalNum = +e.target.value;
        setEdittingTask({ ...edittingTask, settedIntervalNum })
    }
    const saveEdittingTask = () => {
        props.updateTask(props.task._id, edittingTask.name, edittingTask.settedIntervalNum)
        props.setEdittingTaskId(null);
    }
    return (
        <div>
            {
                props.edittingTaskId === props.task._id ?
                    <div className="edit-form-container">
                        <div className="edit-form">
                            <input
                                autoFocus type="text"
                                value={edittingTask.name}
                                placeholder="What are you working on?"
                                className="input-task-name"
                                onChange={changeTaskName}
                                id="input-task-name"
                            />
                            <p className="est-label" id="plpl">Est Pomodoros</p>
                            <div className="vertical-center-align">
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={edittingTask.settedIntervalNum}
                                    className="input-est"
                                    onChange={changeEstTask}
                                />
                                <button
                                    onClick={() => setEdittingTask({ ...edittingTask, settedIntervalNum: (edittingTask.settedIntervalNum + 1) })}
                                >
                                    <ChevronUp strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem" />
                                </button>
                                <button
                                    style={{ marginLeft: '0.5rem' }}
                                    onClick={() => {
                                        if (edittingTask.settedIntervalNum > 1) return setEdittingTask({ ...edittingTask, settedIntervalNum: (edittingTask.settedIntervalNum - 1) });
                                    }}
                                >
                                    <ChevronDown strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem" />
                                </button>
                            </div>
                        </div>
                        <div className="button-action-container">
                            <button
                                className="btn-delete"
                                onClick={() => props.deleteTask(props.task._id)}
                            >Delete</button>
                            <div>
                                <button
                                    className="btn-cancel"
                                    onClick={() => props.setEdittingTaskId(null)}
                                >Cancel</button>
                                <button
                                    disabled={edittingTask.name === "" ? true : false}
                                    className="btn-save btn-save-valid"
                                    className={"btn-save" + (edittingTask.name !== "" ? " btn-save-valid" : "")}
                                    onClick={saveEdittingTask}
                                >Save</button>
                            </div>
                        </div>
                    </div> :

                    <button className={"task-item-control" + " " + props.isSelecting} onClick={() => props.clickTaskItemButton(props.task._id, props.task.name)}>
                        <div className={"align-vertical-content"}>
                            <span onClick={() => props.clickTaskItemIcon(props.task._id)}>
                                <CheckCircle
                                    color="#fff"
                                    size="2rem"
                                    style={{ backgroundColor: props.task.isCompleted ? ('#F05B56' )
                                    : "#DFDFDF", borderRadius: "50%" }}
                                    className={"check-circle" + (props.task.isCompleted ? " check-circle--completed" : "")}
                                     />
                            </span>
                            <span className={"task-name" + (props.task.isCompleted ? " text-completed" : "")}>{props.task.name}</span>
                        </div>
                        <div className="align-vertical-content">
                            <span style={{ color: '#BBB', fontWeight: 'bolder', fontSize: '1.4rem' }}>{props.task.completedIntervalNum}/
                    <span style={{ fontSize: '1.3rem' }}>{props.task.settedIntervalNum}</span></span>
                            <span
                                onClick={(e) => {
                                    e.stopPropagation()
                                    props.setIsAddingTask(false)
                                    props.setEdittingTaskId(props.task._id)
                                }}
                            ><MoreVertical size="2rem" className="more-vertical-icon" /></span>
                        </div>
                    </button>
            }

        </div>
    )
}

export default TaskItem
