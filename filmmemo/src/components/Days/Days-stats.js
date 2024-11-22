
import React, { useEffect, useState, useMemo } from 'react';
import classes from './Days-stats.module.css';
import FilmrecordContext from '../../shared/context/records-context';



export const DayStats = () => {


    const year = useMemo(() => ({
        january: { monthnumber: 1, days: 31 },
        february: { monthnumber: 2, days: 29 },
        march: { monthnumber: 3, days: 31 },
        april: { monthnumber: 4, days: 30 },
        may: { monthnumber: 5, days: 31 },
        june: { monthnumber: 6, days: 30 },
        july: { monthnumber: 7, days: 31 },
        august: { monthnumber: 8, days: 31 },
        september: { monthnumber: 9, days: 30 },
        october: { monthnumber: 10, days: 31 },
        november: { monthnumber: 11, days: 30 },
        december: { monthnumber: 12, days: 31 },
      }), []);


    const [alldays, setAllDays] = useState([]);
    const [sortedDays, setSortedDays] = useState([]);
    const context = React.useContext(FilmrecordContext);


    const everyday = alldays.map(day => {
        return <div key={`${day.day}#${day.month}`} className={classes.daybox}></div>
    })

    // const calendarMaker = () => {
    //     let monthgroup = [];
    //     for (let i=1; i === 12; i++){
    //       monthgroup.push([alldays.filter(d => d.month === i)])
    //     }
    //     return monthgroup;
    // }

    const months = Object.keys(year)

/*     useEffect (() =>{
        let months = Object.keys(year)
        for (const month of months){
            for(let i = 1; i < year[month].days + 1; i++){
                setAllDays((prevDays) => [...prevDays, {day:i, month:year[month].monthnumber}])
            }
        }
    },[]) */

    const getFilmsForDay = (index, monthInfo) => {
        // Your logic to calculate the number of films for the day based on monthInfo
        // Example: return monthInfo.days * 2;
        return index  // Replace with your logic
    };


    useEffect(()=>{
        const dateInsight = async () => {
            let detailDate = []
             if (context.days_collection.length === 0){
                const response = await fetch('http://localhost:5000/api/days/dateinsight');
                detailDate = await response.json();
                context.updateDays(detailDate);
            } else {
                detailDate = context.days_collection
            }

                const newDays = [];
                let months = Object.keys(year)
                for (const month of months){
                     for(let i = 1; i < year[month].days + 1; i++){
                        const day = i < 10 ? `0${i}` : `${i}`;
                        const monthNumber = year[month].monthnumber < 10 ? `0${year[month].monthnumber}` : `${year[month].monthnumber}`;
    
                        const day_month = `${monthNumber}-${day}`;
                        const entry = detailDate.find((item) => item.day_month === day_month);
    
                        if (!newDays.some(mday => mday.day === i && mday.month === year[month].monthnumber)) {
                            newDays.push({ day: i, month: year[month].monthnumber, totalFilms: entry?.record_count || 0 });
                        }
                    }
                }
        
                // Establece el estado una sola vez
                setSortedDays([...newDays]);
                setAllDays(newDays);
            }
        dateInsight();
    },[year, context.days_collection, context.updateDays])

    const calculateColor = (totalfilms) => {
        if (totalfilms > 0 && totalfilms <= 5){
            return '#fbf5bf'
        }
        if (totalfilms > 5 && totalfilms <= 10){
            return '#fdee77'
        }
        if (totalfilms > 10 && totalfilms <= 15){
            return '#f2d600'
        }
        if (totalfilms > 15 && totalfilms <= 20){
            return '#ffc02d'
        }
        if (totalfilms > 20 && totalfilms <= 25){
            return '#f9af00'
        }
        if (totalfilms > 25 && totalfilms <= 30){
            return '#f98c00'
        }
        if (totalfilms > 30){
            return '#f75c28'
        }
    }

    const namify = (number) => {
        switch (number){
            case 1 :return 'january'
            case 2 :return 'february'
            case 3 :return 'march'
            case 4 :return 'april'
            case 5 :return 'may'
            case 6 :return 'june'
            case 7 :return 'july'
            case 8 :return 'august'
            case 9 :return 'september'
            case 10 :return 'october'
            case 11:return 'november'
            case 12 :return 'december'
            default: return 'error';
        }
    }

    return (
        <React.Fragment>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {months.map((month) => (
                    <div key={month} className={classes.month}>
                        <h3>{month}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {alldays
                                .filter((day) => day.month === year[month].monthnumber)
                                .map((mday) => (
                                    <div
                                        key={`${mday.month}-${mday.day}`}
                                        className={classes.daybox}
                                        style={{
                                            border: '1px solid #000',
                                            width: '15px',
                                            height: '15px',
                                            textAlign: 'center',
                                            lineHeight: '15px',
                                            fontSize: '8px',
                                            cursor:'pointer',
                                            backgroundColor: `${calculateColor(mday.totalFilms)}`
                                        }}
                                    >
                                        {mday.day}
                                        <div className={classes.totalday}>
                                        {mday.totalFilms}
                                        </div>
                                    </div>
                                ))}
                        </div>
                  
                    </div>
                ))}
            </div>
            <div>
            {sortedDays.sort((a,b) => b.totalFilms - a.totalFilms).map((day) => 
                 <div key={`${day.day}-${day.month}`} className={classes.ranker}>{day.day}-{namify(day.month)}
                <span> {day.totalFilms}</span>
                </div>                              
            )
         }
        </div>
        </React.Fragment>

    )
}
