import React, { useState } from 'react'
import {ipcRenderer} from 'electron'
import TaskItem from './TaskItem/TaskItem'
import AddTaskControl from './AddTaskControl/AddTaskControl'
import StatisticBar from './StatisticBar/StatisticBar'
import HeaderControl from './HeaderControl/HeaderControl'

const TasksControll = (props) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [edittingTaskId, setEdittingTaskId] = useState(null);
    const tasks = props.tasks ? props.tasks : [];
    //select current task
    const clickTaskItemButton = (_id, name) => {
        props.setCurrentTaskId(_id)
        props.setStartingNotify(false)
        props.setStatusLabel(name)
    }
    //toggle completed - uncompleted
    const clickTaskItemIcon = (_id) => {
        //send completed taskid message to main
        ipcRenderer.invoke('tasks:completed-task', JSON.stringify({
            user: props.user,
            toggleTaskId: _id
        }))
        ipcRenderer.on('tasks:completed-task-success', () => {
            const taskIndex = tasks.findIndex(task => {
                return task._id === _id;
            })
            const task = { ...tasks[taskIndex], isCompleted: !tasks[taskIndex].isCompleted };
            const newTasks = [...tasks];
            newTasks[taskIndex] = task;
            props.setTasks(newTasks)
        })
    }


    const updateTask = (_id, name, settedIntervalNum) => {
        const taskIndex = tasks.findIndex(task => {
            return task._id === _id;
        })
        const task = { ...tasks[taskIndex], name, settedIntervalNum };
        ipcRenderer.invoke('tasks:update-task', JSON.stringify({
            user:  props.user,
            updatedTask: task
        }))   
        ipcRenderer.on('tasks:update-success', () => {
            const newTasks = [...tasks];
            newTasks[taskIndex] = task;
            props.setTasks(newTasks)
        }) 
    }
    const deleteTask = (_id) => {
        ipcRenderer.invoke('tasks:delete-task',JSON.stringify({
            user:  props.user,
            deletedTaskId: _id
        }))
        ipcRenderer.on('tasks:delete-success', () => {
            const newTasks = tasks.filter(task => {
                return task._id !== _id;
            })
            props.setTasks(newTasks);
        })
    }
    const clearFinishedTasks = () => {
        ipcRenderer.invoke('tasks:clear-finished-task', JSON.stringify({
            user:  props.user
        }))
        ipcRenderer.on('tasks:clear-finished-task-success', () => {
            const newTasks = tasks.map(task => {
                if(task.isCompleted){
                    const newTask = {...task, isDisplayed: false}
                    return newTask;
                }
                else{
                    return task;
                }
            })
            props.setTasks(newTasks);
        })
    }
    return (
        <div>
            <HeaderControl clearFinishedTasks={clearFinishedTasks} tab={props.tab}/>
            <hr />
            <div style={{ margin: "1.3rem 0" }}>
                {
                    tasks.map(task => {
                        if (task.isDisplayed) {
                            return <TaskItem
                                key={task._id}
                                task={task}
                                isSelecting={task._id === props.currentTaskId ? "task-item-control--selected" : ""}
                                clickTaskItemButton={clickTaskItemButton}
                                clickTaskItemIcon={clickTaskItemIcon}
                                updateTask={updateTask}
                                edittingTaskId={edittingTaskId}
                                setEdittingTaskId={setEdittingTaskId}
                                setIsAddingTask={setIsAddingTask}
                                deleteTask={deleteTask}
                                setStatusLabel={props.setStatusLabel}
                            />

                        }
                        else {
                            return "";
                        }
                    })
                }
            </div>
            <AddTaskControl
                isAddingTask={isAddingTask}
                setIsAddingTask={setIsAddingTask}
                tasks={tasks}
                setTasks={props.setTasks}
                setEdittingTaskId={setEdittingTaskId}
                tab={props.tab}
                user={props.user}
            />
            <StatisticBar tab={props.tab} statisticBar={props.statisticBar}/>
            <p>&nbsp;</p>
        </div>
    )
}

export default TasksControll
