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
            settedIntervalNum: 5,
        },
        {
            _id: 2,
            name: "Coding",
            isCompleted: false,
            isDisplayed: true,
            completedIntervalNum: 1,
            settedIntervalNum: 2,
        },
        {
            _id: 3,
            name: "Running",
            isCompleted: true,
            isDisplayed: true,
            completedIntervalNum: 1,
            settedIntervalNum: 1,
        },
        {
            _id: 4,
            name: "Reading Book",
            isCompleted: true,
            isDisplayed: true,
            completedIntervalNum: 3,
            settedIntervalNum: 2,
        },
    ])
    const [statusLabel, setStatusLabel] = useState('Time to Work!')
    const [startingNotify, setStartingNotify] = useState(true)
    
    const [pomodoroSetting, setPomodoroSetting] = useState({
        pomoTime: 24,
        shortBreakTime: 6,
        longBreakTime: 19,
        longBreakInterval: 3,
    })
    const [tab, setTab] = useState('pomo')
    const [timePast, setTimePast] = useState(0)
    const [isTimeStopping, setIsTimeStopping] = useState(true)
    return (
        <div className = {"main-container"
        + (tab === "short-break" ? ' main-container__short-break' : '')
        + (tab === "long-break" ? ' main-container__long-break' : '')
        }>
            <div className = "main-frame">
                <NavigationBar />
                <TimerBoard 
                    statusLabel={statusLabel} 
                    startingNotify={startingNotify}
                    pomodoroSetting={pomodoroSetting}
                    timePast={timePast}
                    setTimePast={setTimePast}
                    setTab={setTab}
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
                />
            </div>
        </div>
    )
}

export default MainFrame
