import React from "react";
import classes from './Directors.module.css';
import { useState } from "react";

const Directors = () => {

    const [bestDirectors, setBestDirector] = useState([]);
    const [minimum, setMinimum] = useState(1);

    const handleBestDirectorSearch = async () => {
        console.log(minimum)
        try{
           const directors = await fetch(`http://localhost:5000/api/directors/best?min=${minimum}`)
           console.log(directors)
        } catch{

        }
    }

    const handleMinimumChange = (event) => {
        let min = event.target.value
        if (Number(min)){
            setMinimum(min)
        } else if (min && !Number(min)) {
            alert('el mínim ha de ser un número, tanoca')
            setMinimum(1)
        } else {
            setMinimum(1)
        }
        
    }

    return (
        <React.Fragment>
            <div className={classes.commandrow}>
                <div className={classes.best_avg}>
                Minimun films <input className={classes.best_avg_input} onChange={handleMinimumChange}></input>
                <button  onClick={handleBestDirectorSearch}>Best rating</button>
                </div>     
            </div>
        </React.Fragment>
    )
}

export default Directors