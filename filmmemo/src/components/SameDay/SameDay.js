import React, {useEffect, useState, useCallback} from 'react';
import LittleCard from '../LastFive/LittleCard';
import classes from './SameDay.module.css';
import FilmrecordContext from '../../shared/context/records-context';
import { useNavigate } from 'react-router-dom';

export function SameDay(props){

    const [sameDayFilms, setSameDayFilms] = useState([]);
    const [sameDayAvg, setSameDayAvg] = useState();
    const [dayRank, setDayRank] = useState(); 
    const allrecords = React.useContext(FilmrecordContext)
    const todaydate = new Date();
    const intl = new Intl.DateTimeFormat('es-ES');
    const today = intl.format(todaydate);
    const navigate = useNavigate();


    const wholeYearRecords = useCallback(async () => {
        const response = await fetch (`http://localhost:5000/api/days/dayrecords`);
        const data = await response.json();

        let day = todaydate.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
        let month = (todaydate.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with leading zero if necessary
        let dateStr = day + month; // Concatenate day and month strings
        const targetDate = data.find((item) => item.id === dateStr);
        setSameDayAvg(targetDate.avrg.toFixed(2))
        setDayRank(targetDate.ranking)
    }, []);

    useEffect(()=>{
        if(allrecords.collection.length > 0){
            let totalrates = 0;
            let sameday = allrecords.collection.filter(f => findSameDate(f.ratedate));
            sameday.map(f => totalrates += f.rating)
            // setSameDayAvg((totalrates / sameday.length).toFixed(2))
            setSameDayFilms(sameday)
            wholeYearRecords(); 
        }  
      
    },[allrecords, wholeYearRecords]);

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
        rating={item.rating} 
        id={item.id}/>
    );

    return(
    <React.Fragment>
    <h2 className={classes.headerlast5}>Same day {today} <span>({sameDayAvg})</span> <span className={classes.ranko}>{dayRank} rank dia</span></h2>
     <div className={classes.samedayarea}>{films}</div>       
    </React.Fragment> 
    )
    }