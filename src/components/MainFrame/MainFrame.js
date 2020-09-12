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
            completedIntervalNum: 2,
            settedIntervalNum: 5,
        },
        {
            _id: 2,
            name: "Coding",
            isCompleted: false,
            completedIntervalNum: 1,
            settedIntervalNum: 2,
        },
        {
            _id: 3,
            name: "Running",
            isCompleted: true,
            completedIntervalNum: 1,
            settedIntervalNum: 1,
        },
        {
            _id: 4,
            name: "Reading Book",
            isCompleted: true,
            completedIntervalNum: 3,
            settedIntervalNum: 2,
        },
    ])
    const [statusLabel, setStatusLabel] = useState('Time to Work!')
    const [startingNotify, setStartingNotify] = useState(true)
    

    return (
        <div className = "main-frame">
            <NavigationBar />
			<TimerBoard statusLabel={statusLabel} startingNotify={startingNotify}/>
            <TasksControll 
                tasks={tasks} 
                setTasks={setTasks} 
                setStatusLabel={setStatusLabel} 
                setStartingNotify={setStartingNotify}
            />
        </div>
    )
}

export default MainFrame
