import React, { useState } from 'react'
import TaskItem from './TaskItem/TaskItem'
import AddTaskControl from './AddTaskControl/AddTaskControl'
import StatisticBar from './StatisticBar/StatisticBar'
import HeaderControl from './HeaderControl/HeaderControl'

const TasksControll = (props) => {
    const [currentTaskId, setCurrentTaskId] = useState(1);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [edittingTaskId, setEdittingTaskId] = useState(null);
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
        const task = { ...tasks[taskIndex], isCompleted: !tasks[taskIndex].isCompleted };
        const newTasks = [...tasks];

        newTasks[taskIndex] = task;
        props.setTasks(newTasks)
    }


    const updateTask = (_id, name, settedIntervalNum) => {
        const taskIndex = tasks.findIndex(task => {
            return task._id === _id;
        })
        const task = { ...tasks[taskIndex], name, settedIntervalNum };
        const newTasks = [...tasks];
        newTasks[taskIndex] = task;
        props.setTasks(newTasks)
    }
    const deleteTask = (_id) => {
        const newTasks = tasks.filter(task => {
            return task._id !== _id;
        })
        props.setTasks(newTasks);
    }
    const clearFinishedTasks = () => {
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
    }
    return (
        <div>
            <HeaderControl clearFinishedTasks={clearFinishedTasks}/>
            <hr />
            <div style={{ margin: "1.3rem 0" }}>
                {
                    tasks.map(task => {
                        if (task.isDisplayed) {
                            return <TaskItem
                                key={task._id}
                                task={task}
                                isSelecting={task._id === currentTaskId ? "task-item-control--selected" : ""}
                                clickTaskItemButton={clickTaskItemButton}
                                clickTaskItemIcon={clickTaskItemIcon}
                                updateTask={updateTask}
                                edittingTaskId={edittingTaskId}
                                setEdittingTaskId={setEdittingTaskId}
                                setIsAddingTask={setIsAddingTask}
                                deleteTask={deleteTask}
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
            />
            <StatisticBar />
            <p>&nbsp;</p>
        </div>
    )
}

export default TasksControll
