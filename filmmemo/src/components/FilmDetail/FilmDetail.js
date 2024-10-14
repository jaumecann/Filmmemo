import {  useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import { transformData } from "../../shared/helpers";
import classes from './FilmDetail.module.css';
import  Icon  from '@mui/material/Icon';


const FilmDetail = () => {

    const [filmData, setFilmData] = useState();
    const [fullRecordDb, setFullRecordDb] = useState();
    const navigate = useNavigate();

    const ID = useParams().id;

    useEffect(()=>{
        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getFilm/?id=${ID}`);
            const filmdata = await data.json();
            if(filmdata.length > 0){
                setFilmData(filmdata[0]);
            } else {
                navigate('/');
            }

        })()
    },[ID, navigate]);

    useEffect(()=>{
        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const filmdata = await data.json();
            setFullRecordDb(filmdata);
        })()
    },[])



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
                   {filmData.ratedate && <li>{transformData(filmData.ratedate)}</li>}
                    {filmData.ratehour && <li>
                        {filmData.ratehour.slice(0,2) < 18 && <span className={classes.icontime}><Icon>light_mode</Icon></span>}
                        {filmData.ratehour.slice(0,2) > 18 && <span className={classes.icontime}><Icon>bedtime</Icon></span>}
                        {filmData.ratehour}
                    </li>}
                    <div className={classes.edit}>
                    <Link to={`/edit/${ID}`}>
                    Edit
                    </Link>    
                    </div>
                </div>
                <div className={filmData.rating ? classes.ratearea : classes.novista}>
                {filmData.rating ? filmData.rating : 'NO VISTA'}
                </div>
                
            </div>  }     
            <section className={classes.directorArea}>
            {filmData && <div className={classes.directorHeader}>Films by {filmData.directorname}</div>}
            {fullRecordDb && filmData && <div className={classes.directorPosters}>
                    {fullRecordDb.filter(f => f.directorid === filmData.directorid).map(
                        film => 
                            <div key={film.id} className={classes.poster}>
                                <Link to={`/film/${film.id}`}>
                                <img className={film.rating ? classes.normal : classes.poster_not_seen}  alt={film.title} src={`/assets/${film.poster}`}></img>
                                </Link>                  
                            </div>
                    )}
                </div>}
            </section>
        </div>
    )
}


export default FilmDetail