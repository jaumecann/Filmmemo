import { useState, useEffect} from "react";
import classes from './Monitor.module.css';

const Monitor = () => {

    const [unseenFilms, setUnseenFilms]= useState([])

    useEffect(()=>{

        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const filmdata = await data.json();
            const unseen = filmdata.filter(f => f.rating === null)
            console.log(unseen);
            setUnseenFilms(unseen);
        })()
    },[]);


    return (<div>
    <div className={classes.wrapper}>
    {unseenFilms && <div>
            {unseenFilms.map(f => 
                <div key={f.id} className={classes.entry} >
                    <img alt="poster" src={`/assets/${f.poster}`}></img>
                    <div>{f.title}</div>
                </div>
            )}
        </div>}
    </div>

    </div>)
}

export default Monitor