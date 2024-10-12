import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { transformData } from "../../shared/helpers";
import classes from './FilmDetail.module.css';
import  Icon  from '@mui/material/Icon';
import FilmrecordContext from "../../shared/context/records-context";

const FilmDetail = () => {

    const [filmData, setFilmData] = useState();
    const allContext = useContext(FilmrecordContext);

    const ID = useParams().id;

    useEffect(()=>{
        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getFilm/?id=${ID}`);
            const filmdata = await data.json();
            setFilmData(filmdata[0]);
        })()
    },[ID])



    return (
        <div>
            {filmData && <div className={classes.wrap}>
                <div>
                {filmData && <h1>{filmData.title}</h1>}
                <img alt='poster' src={`/assets/${filmData.poster}`}></img>
                </div>
                <div className={classes.data}>
                    <li><img alt='flag' src={`/flags/${filmData.country}.png`}></img></li>
                    <li>Any: {filmData.yearFilm}</li>
                    <li>Director: {filmData.directorname}</li>   
                    <li>{transformData(filmData.ratedate)}</li>
                    <li>
                        {filmData.ratehour.slice(0,2) < 18 && <span className={classes.icontime}><Icon>light_mode</Icon></span>}
                        {filmData.ratehour.slice(0,2) > 18 && <span className={classes.icontime}><Icon>bedtime</Icon></span>}
                        {filmData.ratehour}
                    </li>
                    <div className={classes.edit}>
                    <Link to={`/edit/${ID}`}>
                    Edit
                    </Link>    
                    </div>
                </div>
                <div className={classes.ratearea}>
                {filmData.rating}
                </div>
                
            </div>  }     
            <section className={classes.directorArea}>
            {filmData && <div className={classes.directorHeader}>Films by {filmData.directorname}</div>}
            {allContext.collection && filmData && <div className={classes.directorPosters}>
                    {allContext.collection.filter(f => f.directorid === filmData.directorid).map(
                        film => 
                            <div key={film.id} className={classes.poster}>
                                <Link to={`/film/${film.id}`}>
                                <img alt={film.title} src={`/assets/${film.poster}`}></img>
                                </Link>                  
                            </div>
                    )}
                </div>}
            </section>
        </div>
    )
}


export default FilmDetail