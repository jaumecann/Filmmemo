import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import classes from './FilmDetail.module.css'

const FilmDetail = () => {

    const [filmData, setFilmData] = useState();

    const ID = useParams().id;

    useEffect(()=>{
        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getFilm/?id=${ID}`);
            const filmdata = await data.json();
            setFilmData(filmdata[0]);
        })()
    },[])

    return (
        <div>
            <div className={classes.wrap}>
                <div>
                {filmData && <h1>{filmData.title}</h1>}
                <img alt='poster' src={`/assets/${filmData.poster}`}></img>
                </div>
                <div className={classes.data}>
                    <li><img alt='flag' src={`/flags/${filmData.country}.png`}></img></li>
                    <li>Any: {filmData.yearFilm}</li>
                    <li>Director: {filmData.directorname}</li>   
                </div>
                <div className={classes.ratearea}>
                {filmData.rating}
                </div>
            </div>       
        </div>
    )
}


export default FilmDetail