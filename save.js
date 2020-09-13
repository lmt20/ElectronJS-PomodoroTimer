<div className="edit-form-container">
    <div className="edit-form">
        <input
            autoFocus type="text"
            placeholder="What are you working on?"
            className="input-task-name"
            // onChange={changeTaskName}
            id="input-task-name"
        />
        <p className="est-label" id="plpl">Est Pomodoros</p>
        <div className="vertical-center-align">
            <input
                type="number"
                min="1"
                step="1"
                // value={addingTask.settedIntervalNum}
                className="input-est"
            // onChange={changeEstTask}
            />
            <button
            // onClick={() => setAddingTask({ ...addingTask, settedIntervalNum: (addingTask.settedIntervalNum + 1) })}
            >
                <ChevronUp strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem" />
            </button>
            <button
                style={{ marginLeft: '0.5rem' }}
                onClick={() => {
                    // if (addingTask.settedIntervalNum > 1) return setAddingTask({ ...addingTask, settedIntervalNum: (addingTask.settedIntervalNum - 1) });
                }}
            >
                <ChevronDown strokeWidth="0.25rem" color="rgb(85, 85, 85)" size="1.2rem" />
            </button>
        </div>
    </div>
    <div className="button-action-container">
        <button
            className="btn-cancel"
        // onClick={() => props.setIsAddingTask(false)}
        >Cancel</button>
        <button
            // disabled={addingTask.name === "" ? true : false}
            className="btn-save btn-save-valid"
        // className={"btn-save" + (addingTask.name !== "" ? " btn-save-valid" : "")}
        // onClick={saveAddingTask}
        >Save</button>
    </div>
</div>
