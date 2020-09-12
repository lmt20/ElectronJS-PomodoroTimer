import React from 'react'
import './AboutFrame.module.css'

const AboutFrame = () => {
    return (
        <div className="about-frame">
            <div className="title">
                An online Pomodoro Timer to boost your productivity
            </div>
            <div className="paragraph-containeer">
                <div className="paragraph">
                    <div className="paragraph-header">What is Pomofocus?</div>
                    <div className="paragraph-content">
                        Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser.
                         The aim of this app is to help you focus on any task you are working on, such as study,
                          writing, or coding. This app is inspired by <a href="https://francescocirillo.com/pages/pomodoro-technique" 
                          className="link-text">Pomodoro Technique</a> which is a time management
                           method developed by Francesco Cirillo.
                    </div>
                </div>
                <div className="paragraph">
                    <div className="paragraph-header">What is Pomodoro Technique?</div>
                    <div className="paragraph-content">
                    The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student. - 
                    <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" className="link-text"> Wikipedia</a> 
                    </div>
                </div>
                <div className="paragraph">
                    <div className="paragraph-header">How to use the Pomodoro Timer?</div>
                    <div className="paragraph-content content-list">
                        <ol>
                            <li><strong>Add tasks</strong> to work on today</li>
                            <li><strong>Set estimate pomodoros</strong> (1 = 25min of work) for each tasks</li>
                            <li><strong>Select a task</strong> to work on</li>
                            <li><strong>Start timer</strong> and focus on the task for 25 minutes</li>
                            <li><strong>Take a break</strong> for 5 minutes when the alarm ring</li>
                            <li><strong>Iterate</strong> 3-5 until you finish the tasks</li>
                        </ol>
                    </div>
                </div>
                <div className="paragraph">
                    <div className="paragraph-header">Features</div>
                    <div className="paragraph-content content-list">
                        <ul>
                            <li>
                            <strong>Responsive design</strong> that works with desktop and mobile
                            </li>
                            <li>
                            <strong>Color transition</strong> to switch moods between work time and rest time
                            </li>
                            <li>
                            <strong>Audio notification</strong> at the end of a timer period
                            </li>
                            <li>
                            <strong>Customizable timer</strong> intervals to suit your preference
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutFrame
