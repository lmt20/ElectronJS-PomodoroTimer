import React from 'react'
import './StatisticBar.module.css'

const StatisticBar = (props) => {
    return (
        <div className={'statistic-bar' 
            + (props.tab === "short-break" ? " statistic-bar--short-break" :  "")
            + (props.tab === "long-break" ? " statistic-bar--long-break" :  "")
        } >
            <span>
    <span>Est: <span className="bigger-font">{props.statisticBar.unCompletedTasksNum}</span></span>
    <span style={{padding: '0 1rem'}}>Act: <span className="bigger-font">{props.statisticBar.unCompletedIntervalsNum}</span></span>
    <span>Finish at: <span className="bigger-font">{props.statisticBar.estCompleteTime}</span></span>
            </span>
        </div>
    )
}

export default StatisticBar
