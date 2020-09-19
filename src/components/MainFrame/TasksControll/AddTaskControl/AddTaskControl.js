import React, { useState, useRef, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { PlusCircle } from 'react-feather'
import { ChevronUp } from 'react-feather'
import { ChevronDown } from 'react-feather'
import './AddTaskControl.module.css'

const AddTaskControl = (props) => {
    const [addingTask, setAddingTask] = useState({
        name: "",
        settedIntervalNum: 1
    })
    const addingInputEle = useRef(null)
    useEffect(() => {
        if (props.isAddingTask) {
            addingInputEle.current.focus()
        }
    }, [props.isAddingTask, addingTask.name])
    const changeTaskName = (e) => {
        const name = e.target.value;
        setAddingTask({ ...addingTask, name })
    }
    const changeEstTask = (e) => {
        const settedIntervalNum = +e.target.value;
        setAddingTask({ ...addingTask, settedIntervalNum })
    }
    const saveAddingTask = () => {
        setAddingTask({ name: "", settedIntervalNum: 1 })
        //send adding task data to MainProcess
        //logined
        if (props.user._id !== "") {
            ipcRenderer.invoke('tasks:add-task', JSON.stringify({
                user: props.user,
                addingTask: addingTask
            }))
            ipcRenderer.on('tasks:add-success', (e, data) => {
                try {
                    const addedTask = JSON.parse(data)
                    // console.log(addedTask)
                    props.setTasks([...props.tasks, addedTask])
                } catch (error) {
                    console.log(error)
                }
            })
        }else {
            //didn't login
            addingTask.isCompleted = false;
            addingTask.isDisplayed = true;
            addingTask.completedIntervalNum = 0;
            addingTask.created=new Date();
            addingTask._id = (Math.floor(Math.random() * 10000000000)).toString();
            localStorage.setItem('tasks', JSON.stringify([...props.tasks, addingTask]))
            props.setTasks([...props.tasks, addingTask])
        }
    }
    return (
        <div>
            {
                props.isAddingTask ?
                    <div className="add-form-container">
                        <div className="add-form">
                            <input
                                ref={addingInputEle}
                                autoFocus type="text"
                                placeholder="What are you working on?"
                                className="input-task-name"
                                onChange={changeTaskName}
                                value={addingTask.name}
                                id="input-task-name"
                            />
                            <p className="est-label" id="plpl">Est Pomodoros</p>
                            <div className="vertical-center-align">
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={addingTask.settedIntervalNum}
                                    className="input-est"
                                    onChange={changeEstTask}
                                />
                                <button
                                    onClick={() => setAddingTask({ ...addingTask, settedIntervalNum: (addingTask.settedIntervalNum + 1) })}
                                >
                                    <ChevronUp strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem" />
                                </button>
                                <button
                                    style={{ marginLeft: '0.5rem' }}
                                    onClick={() => {
                                        if (addingTask.settedIntervalNum > 1) return setAddingTask({ ...addingTask, settedIntervalNum: (addingTask.settedIntervalNum - 1) });
                                    }}
                                >
                                    <ChevronDown strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem" />
                                </button>
                            </div>
                        </div>
                        <div className="button-action-container-0">
                            <button className="btn-cancel" onClick={() => props.setIsAddingTask(false)}>Cancel</button>
                            <button
                                disabled={addingTask.name === "" ? true : false}
                                className={"btn-save" + (addingTask.name !== "" ? " btn-save-valid" : "")}
                                onClick={saveAddingTask}
                            >Save</button>
                        </div>
                    </div> :
                    <button
                        className={"btn-add-task"
                            + (props.tab === "short-break" ? " btn-add-task--short-break" : "")
                            + (props.tab === "long-break" ? " btn-add-task--long-break" : "")
                        }
                        onClick={() => {
                            props.setEdittingTaskId(null)
                            props.setIsAddingTask(true)
                        }}>
                        <PlusCircle strokeWidth="0.22rem" />
                        <span style={{ paddingLeft: "0.5rem", fontWeight: 'bold', fontSize: "1.2rem" }}>Add Task</span>
                    </button>
            }
        </div>

    )
}

export default AddTaskControl
