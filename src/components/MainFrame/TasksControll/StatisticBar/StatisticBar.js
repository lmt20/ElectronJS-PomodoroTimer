import React from 'react'
import './StatisticBar.module.css'

const StatisticBar = (props) => {
    return (
        <div className={'statistic-bar' 
            + (props.tab === "short-break" ? " statistic-bar--short-break" :  "")
            + (props.tab === "long-break" ? " statistic-bar--long-break" :  "")
        } >
            <span>
                <span>Est: <span className="bigger-font">4</span></span>
                <span style={{padding: '0 1rem'}}>Act: <span className="bigger-font">0</span></span>
                <span>Finish at: <span className="bigger-font">20:06</span></span>
            </span>
        </div>
    )
}

export default StatisticBar
