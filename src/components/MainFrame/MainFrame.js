import React, {useState} from 'react'
import NavigationBar from './NavigationBar/NavigationBar'
import TimerBoard from './TimerBoard/TimerBoard'
import TasksControll from './TasksControll/TasksControll'
import './MainFrame.module.css'

const MainFrame = () => {
    const [tasks, setTasks] = useState([
        {
            _id: 1,
            name: "Writing reports",
            isCompleted: false,
            isDisplayed: true,
            completedIntervalNum: 2,
            settedIntervalNum: 3,
        },
        {
            _id: 2,
            name: "Coding",
            isCompleted: true,
            isDisplayed: true,
            completedIntervalNum: 1,
            settedIntervalNum: 2,
        },
        {
            _id: 3,
            name: "Running",
            isCompleted: false,
            isDisplayed: true,
            completedIntervalNum: 1,
            settedIntervalNum: 2,
        },
        {
            _id: 4,
            name: "Reading Book",
            isCompleted: false,
            isDisplayed: true,
            completedIntervalNum: 3,
            settedIntervalNum: 2,
        },
    ])
    const [statusLabel, setStatusLabel] = useState('Time to Work!')
    const [startingNotify, setStartingNotify] = useState(true)
    
    const [pomodoroSetting, setPomodoroSetting] = useState({
        pomoTime: 1,
        shortBreakTime: 1,
        longBreakTime: 20,
        longBreakInterval: 2,
    })
    const [changedSetting, setChangedSetting] = useState({
        pomoTime: false,
        shortBreakTime: false,
        longBreakTime: false
    })
    const [numInterval, setNumInterval] = useState(0)
    const [tab, setTab] = useState('pomo')
    const [currentTaskId, setCurrentTaskId] = useState(1);
    const [timePast, setTimePast] = useState(0)
    const [isTimeStopping, setIsTimeStopping] = useState(true)
    const completeCurrentTask = () => {
        //complete old task
        const completedTaskIndex = tasks.findIndex(task => {
            return task._id === currentTaskId;
        })
        const updateTask = {
            ...tasks[completedTaskIndex],
            completedIntervalNum: tasks[completedTaskIndex].completedIntervalNum + 1
        }
        if(updateTask.completedIntervalNum === updateTask.settedIntervalNum){
            updateTask.isCompleted = true;
        }
        const updateTasks = [...tasks]
        updateTasks[completedTaskIndex] = updateTask
        setTasks(updateTasks)
    }
    const startNextTask = () => {
        //set begin new task
        console.log("next")
        const currentTask = tasks.find(task => {
            return task._id === currentTaskId;
        })

        if(currentTask.isCompleted === true){
            for (const task of tasks) {
                if(!task.isCompleted){
                    return setCurrentTaskId(task._id)
                }
            }
        }
    }
    return (
        <div className = {"main-container"
        + (tab === "short-break" ? ' main-container__short-break' : '')
        + (tab === "long-break" ? ' main-container__long-break' : '')
        }>
            <div className = "main-frame">
                <NavigationBar tab={tab}
                 pomodoroSetting={pomodoroSetting} setPomodoroSetting={setPomodoroSetting}
                 setChangedSetting={setChangedSetting}
                 />
                <TimerBoard 
                    statusLabel={statusLabel} 
                    startingNotify={startingNotify}
                    pomodoroSetting={pomodoroSetting}
                    changedSetting={changedSetting}
                    timePast={timePast}
                    setTimePast={setTimePast}
                    tab={tab}
                    setTab={setTab}
                    completeCurrentTask={completeCurrentTask}
                    startNextTask={startNextTask}
                    numInterval={numInterval}
                    setNumInterval={setNumInterval}
                    // currentStatus={currentStatus}
                    // setCurrentStatus={setCurrentStatus}
                    isTimeStopping={isTimeStopping}
                    setIsTimeStopping={setIsTimeStopping}
                />
                <TasksControll 
                    tasks={tasks} 
                    setTasks={setTasks} 
                    setStatusLabel={setStatusLabel} 
                    setStartingNotify={setStartingNotify}
                    tab={tab}
                    currentTaskId={currentTaskId}
                    setCurrentTaskId={setCurrentTaskId}
                />
            </div>
        </div>
    )
}

export default MainFrame
