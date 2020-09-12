import React, { useState } from 'react'
import TaskItem from './TaskItem/TaskItem'
import AddTaskControl from './AddTaskControl/AddTaskControl'
import StatisticBar from './StatisticBar/StatisticBar'
import HeaderControl from './HeaderControl/HeaderControl'

const TasksControll = (props) => {
    const [currentTaskId, setCurrentTaskId] = useState(1);
    const tasks = props.tasks ? props.tasks : [];
    const clickTaskItemButton = (_id, name) => {
        setCurrentTaskId(_id)
        props.setStartingNotify(false)
        props.setStatusLabel(name)
    }
    const clickTaskItemIcon = (_id) => {
        const taskIndex = tasks.findIndex(task => {
            return task._id === _id;
        })
        const task = {...tasks[taskIndex], isCompleted: !tasks[taskIndex].isCompleted};
        const newTasks = [...tasks];
        newTasks[taskIndex] = task;
        props.setTasks(newTasks)
    }
    return (
        <div>
            <HeaderControl />   
            <hr />
            <div style={{ margin: "1.3rem 0" }}>
                {   
                    tasks.map(task => {
                        return <TaskItem
                            key={task._id}
                            _id={task._id}
                            isSelecting={task._id === currentTaskId ? "task-item-control--selected" : ""}
                            isCompleted={task.isCompleted}
                            name={task.name}
                            completedIntervalNum={task.completedIntervalNum}
                            settedIntervalNum={task.settedIntervalNum}
                            clickTaskItemButton={clickTaskItemButton}
                            clickTaskItemIcon={clickTaskItemIcon}
                        />
                    })
                }
            </div>
            <AddTaskControl />
            <StatisticBar />
            <p>&nbsp;</p>
        </div>
    )
}

export default TasksControll
