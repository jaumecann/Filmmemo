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
      if(!fullRecordDb){
        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const allfilms = await data.json();
            setFullRecordDb(allfilms);
            console.log(allfilms.find(f => f.id === parseInt(ID)))
            const gotcha = allfilms.find(f => f.id === parseInt(ID))
            setFilmData(gotcha)
            if(!gotcha){
                navigate('/');
             }
        })()
      } else {
        const gotcha = fullRecordDb.find(f => f.id === parseInt(ID))
        setFilmData(gotcha)
        if(!gotcha){
            navigate('/');
         }
      }
        
    },[ID, navigate,fullRecordDb])


    const goToDirectorHistory = (id, directorname) => {
        navigate('/history', { state: { id: id, name:directorname} });
    }



    return (
        <div>
            {filmData && <div className={classes.wrap}>
                <div>
                {filmData && <h1>{filmData.title}</h1>}
                <img alt='poster' src={`/assets/${filmData.poster}`}></img>
                </div>
                <div className={classes.data}>
                    <li><img alt='flag' src={`/flags/${filmData.country.trim()}.png`}></img></li>
                    <li>Any: {filmData.yearFilm}</li>
                    <li onClick={()=>goToDirectorHistory(filmData.directorid, filmData.directorname)}>Director: {filmData.directorname}</li>   
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
            {filmData && <div className={classes.directorHeader} onClick={()=>goToDirectorHistory(filmData.directorid, filmData.directorname)}>Films by {filmData.directorname}</div>}
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