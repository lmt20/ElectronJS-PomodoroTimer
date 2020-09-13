import React, {useState, useEffect} from 'react'

const TimerDisplay = (props) => {
    const [targetTime, setTargetTime] = useState(props.targetTime || 57)
    const [startTime, setStartTime] = useState(new Date())
    const [minutes, setMinutes] = useState(57)
    const [seconds, setSeconds] = useState(11)
    
    useEffect(() => {
        setInterval(() => {
            const currentTime = new Date();
            const timeSpan = currentTime - startTime;
            const spanSeconds = Math.round(timeSpan / 1000)
            const restSeconds = targetTime * 60 - spanSeconds;
            const displayedSeconds = restSeconds % 60;
            const displayedMinutes = Math.floor(restSeconds / 60);
            setMinutes(displayedMinutes)
            setSeconds(displayedSeconds)
        }, 1000)
        
    }, [minutes, seconds])
    return (
        <div style={{fontSize: "7.5rem",letterSpacing: '0.25rem', textAlign: "center", fontWeight: "bolder", fontFamily:"Arial-Rounded", margin: "1.5rem 0"}}>
            {minutes}:{seconds < 10 ? '0' + seconds: seconds}
        </div>
    )
}

export default TimerDisplay
