import React from "react";
import classes from './Directors.module.css'

const Directors = () => {

    return (
        <React.Fragment>
            <div className={classes.commandrow}>
                <div classname={classes.best_avg}>
                Minimun films <input classname={classes.best_avg_input}></input>
                <button>Best rating</button>
                </div>     
            </div>
        </React.Fragment>
    )
}

export default Directors