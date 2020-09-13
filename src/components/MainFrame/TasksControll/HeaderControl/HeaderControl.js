import React, { useState, useRef, useEffect } from 'react'
import { MoreVertical, Check, Save, Plus } from 'react-feather';
import './HeaderControl.module.css';


const HeaderControl = (props) => {
    const [isDisplayMoreOption, setIsDisplayMoreOption] = useState(false)
    const moreControlEle = useRef(null);
    const moreAreaControlEle = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (moreAreaControlEle.current && !moreAreaControlEle.current.contains(event.target)) {
                if(moreControlEle.current && !moreControlEle.current.contains(event.target)){
                    setIsDisplayMoreOption(false)
                }
            }
        }
        if (isDisplayMoreOption) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isDisplayMoreOption]);
    return (
        <div className="header-control">
            <span>Tasks</span>
            <span ref={moreControlEle} onClick={() => {
                setIsDisplayMoreOption(!isDisplayMoreOption)
            }}>
                <MoreVertical
                    style={{ backgroundColor: "#F16965", padding: "3px 4px", borderRadius: "0.3rem" }}
                    size="2rem"
                />
            </span>
            <div ref={moreAreaControlEle} className={"header-option" + (isDisplayMoreOption ? "" : " header-option-hide")}>
                <div style={{ margin: "0.5rem 0" }}>
                    <div onClick = {() => props.clearFinishedTasks()}>
                        <Check size="1rem" strokeWidth="0.3rem" />
                        &nbsp;Clear finished
                    </div>
                    <div>
                        <Save size="1rem" strokeWidth="0.2rem" />
                        &nbsp;Save as template
                    </div>
                    <div>
                        <Plus size="1rem" strokeWidth="0.3rem" />
                        &nbsp;Add from template
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderControl
