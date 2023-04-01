import React, {useEffect, useState} from 'react';
import LittleCard from '../LastFive/LittleCard';
import classes from './SameDay.module.css';
import FilmrecordContext from '../../shared/context/records-context';

export function SameDay(props){

    const [sameDayFilms, setSameDayFilms] = useState([]);
    const [sameDayAvg, setSameDayAvg] = useState();
    const allrecords = React.useContext(FilmrecordContext)
    const todaydate = new Date();
    const intl = new Intl.DateTimeFormat('es-ES');
    const today = intl.format(todaydate)


    useEffect(()=>{
        console.log(allrecords)
        if(allrecords.collection.length > 0){
            let totalrates = 0;
            let sameday = allrecords.collection.filter(f => findSameDate(f.ratedate));
            sameday.map(f => totalrates += f.rating)
            setSameDayAvg((totalrates / sameday.length).toFixed(2))
            setSameDayFilms(sameday)
        }  
    },[allrecords]);

    const findSameDate = (rawdate) => { 
        const date = new Date(rawdate);
        const month = date.getMonth();
        const day = date.getDate();

        const today = new Date();
        const todaymonth = today.getMonth();
        const todayday = today.getDate();

        if (month === todaymonth && day === todayday){
            return true
        }
    }


    let films = sameDayFilms.map((item) => 
        <LittleCard 
        key={item.id} 
        title={item.title} 
        year={item.yearFilm} 
        date={item.ratedate} 
        director={item.directorid} 
        country={item.country}
        img={item.poster}
        rating={item.rating} />
    );

    return(
    <React.Fragment>
    <h2 className={classes.headerlast5}>Same day {today} <span>({sameDayAvg})</span></h2>
     <div className={classes.samedayarea}>{films}</div>       
    </React.Fragment> 
    )
    }