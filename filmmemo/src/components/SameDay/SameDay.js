import React, {useEffect, useState} from 'react';
import LittleCard from '../LastFive/LittleCard';
import classes from './SameDay.module.css';
import FilmrecordContext from '../../shared/context/records-context';

export function SameDay(props){

    const [sameDayFilms, setSameDayFilms] = useState([]);
    const allrecords = React.useContext(FilmrecordContext)


    useEffect(()=>{
        if(allrecords.collection.length > 0){
            setSameDayFilms(allrecords.collection.filter(f => findSameDate(f.ratedate)))

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


    const films = sameDayFilms.map((item) => 
     <div>
    <div className={classes.year}>{item.ratedate.slice(0,4)}</div>
     <LittleCard key={item.id} 
     title={item.title} 
     year={item.yearFilm} 
     date={item.ratedate} 
     director={item.directorid} 
     country={item.country}
     img={item.poster}
     rating={item.rating} />
     </div>

    );

    return(
    <React.Fragment>
    <h2 className={classes.headerlast5}>Same day</h2>
     <div className={classes.samedayarea}>{films}</div>       
    </React.Fragment> 
    )
    }