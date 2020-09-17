import React, { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar/NavigationBar'
import TimerBoard from './TimerBoard/TimerBoard'
import TasksControll from './TasksControll/TasksControll'
import './MainFrame.module.css'
import { ipcRenderer } from 'electron'

const MainFrame = () => {
    const [tasks, setTasks] = useState([])
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [statisticBar, setStatisticBar] = useState({
        unCompletedTasksNum: 3,
        unCompletedIntervalsNum: 6,
        estCompleteTime: "22h30"
    })
    const [pomodoroSetting, setPomodoroSetting] = useState({
        pomoTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
        longBreakInterval: 3,
    })
    const [statusLabel, setStatusLabel] = useState('Time to Work!')
    const [startingNotify, setStartingNotify] = useState(true)

    const [changedSetting, setChangedSetting] = useState({
        pomoTime: false,
        shortBreakTime: false,
        longBreakTime: false
    })
    const [numInterval, setNumInterval] = useState(0)
    const [tab, setTab] = useState('pomo')
    const [timePast, setTimePast] = useState(0)
    const [isTimeStopping, setIsTimeStopping] = useState(true)
    const [autoContinue, setAutoContinue] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [userId, setUserId] = useState(null)
    const getValueOfStatisticBar = () => {
        let unCompletedTasksNum = 0; 
        let unCompletedIntervalsNum = 0;
        let estCompleteTime = Date.now();
        for (const task of tasks) {
            if (task.isDisplayed) {
                if(!task.isCompleted){
                    unCompletedTasksNum += 1;
                    if(task.completedIntervalNum < task.settedIntervalNum){
                        unCompletedIntervalsNum += (task.settedIntervalNum - task.completedIntervalNum)
                    }
                }
            }
        }
        const longBreakNum = Math.floor((unCompletedIntervalsNum - 1) / pomodoroSetting.longBreakInterval) > 0 ?
        Math.floor((unCompletedIntervalsNum - 1) / pomodoroSetting.longBreakInterval) : 0;
        const shortBreakNum = (unCompletedIntervalsNum - longBreakNum - 1) > 0 ?
        (unCompletedIntervalsNum - longBreakNum - 1)  : 0;
        estCompleteTime += (unCompletedIntervalsNum*pomodoroSetting.pomoTime 
        + shortBreakNum*pomodoroSetting.shortBreakTime
        + longBreakNum*pomodoroSetting.longBreakTime)*60*1000;
        const targetTimePoint = new Date(estCompleteTime)
        setStatisticBar({
            unCompletedTasksNum, 
            unCompletedIntervalsNum,
            estCompleteTime: targetTimePoint.getHours()+":"+targetTimePoint.getMinutes(),
        })
    }
    useEffect(() => {
        ipcRenderer.invoke('tasks:load')
        ipcRenderer.on('tasks:getAll', (e, tasks) => {
            let tasksArr;
            try {
                tasksArr = JSON.parse(tasks);
                setTasks(tasksArr)
                //set initial current task
                for (const task of tasksArr) {
                    if (!task.isCompleted) {
                        setCurrentTaskId(task._id);
                        break;
                    }
                }
            } catch (error) {
                tasksArr = [];
            }
        })
    }, [])
    useEffect(() => {
        getValueOfStatisticBar()
    }, [tasks, pomodoroSetting, numInterval])
    //initial setting state

    useEffect(() => {
        ipcRenderer.invoke('setting:load')
        ipcRenderer.on('setting:get', (e, setting) => {
            let currentPomoSetting;
            try {
                currentPomoSetting = JSON.parse(setting);
                setPomodoroSetting(currentPomoSetting)
            } catch (error) {
                tasksArr = [];
            }
        })
    }, [])

    const completeCurrentTask = () => {
        //complete old task
        const completedTaskIndex = tasks.findIndex(task => {
            return task._id === currentTaskId;
        })
        const updateTask = {
            ...tasks[completedTaskIndex],
            completedIntervalNum: tasks[completedTaskIndex].completedIntervalNum + 1
        }
        if (updateTask.completedIntervalNum === updateTask.settedIntervalNum) {
            updateTask.isCompleted = true;
        }
        ipcRenderer.invoke('tasks:update-task', JSON.stringify(updateTask))   
        ipcRenderer.on('tasks:update-success', () => {
            const updateTasks = [...tasks]
            updateTasks[completedTaskIndex] = updateTask
            setTasks(updateTasks)
        }) 

    }
    const startNextTask = () => {
        //set begin new task
        console.log("next")
        const currentTask = tasks.find(task => {
            return task._id === currentTaskId;
        })

        if (currentTask.isCompleted === true) {
            for (const task of tasks) {
                if (!task.isCompleted) {
                    return setCurrentTaskId(task._id)
                }
            }
        }
    }
    //initial value of statisticBar label
    

    return (
        <div className={"main-container"
            + (tab === "short-break" ? ' main-container__short-break' : '')
            + (tab === "long-break" ? ' main-container__long-break' : '')
        }>
            <div className="main-frame">
                <NavigationBar tab={tab}
                    pomodoroSetting={pomodoroSetting} setPomodoroSetting={setPomodoroSetting}
                    setChangedSetting={setChangedSetting}
                    autoContinue={autoContinue}
                    setAutoContinue={setAutoContinue}
                    userId={userId}
                    setUserId={setUserId}
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
                    autoContinue={autoContinue}
                    setAutoContinue={setAutoContinue}
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
                    statisticBar={statisticBar}
                />
            </div>
        </div>
    )
}

export default MainFrame
