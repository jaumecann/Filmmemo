
import React, { useEffect, useState } from 'react';
import classes from './Days-stats.module.css';



export const DayStats = () => {


    const year = {
        january:{monthnumber:1, days:31},
        february:{monthnumber:2, days:29},
        march:{monthnumber:3, days:31},
        april:{monthnumber:4, days:30},
        may:{monthnumber:5, days:31},
        june:{monthnumber:6, days:30},
        july:{monthnumber:7, days:31},
        august:{monthnumber:8, days:31},
        september:{monthnumber:9, days:30},
        october:{monthnumber:10, days:31},
        november:{monthnumber:11, days:30},
        december:{monthnumber:12, days:31},
    }


    const [alldays, setAllDays] = useState([]);


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

    useEffect (() =>{
        let months = Object.keys(year)
        for (const month of months){
            for(let i = 1; i < year[month].days + 1; i++){
                setAllDays((prevDays) => [...prevDays, {day:i, month:year[month].monthnumber}])
            }
        }
    },[])

    return (
        <React.Fragment>
            <h1>tranqui tronqui</h1>
            <div style={{ display: 'flex' }}>
                {months.map((month) => (
                    <div key={month} style={{ marginRight: '20px' }}>
                        <h3>{month}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {alldays
                                .filter((day) => day.month === year[month].monthnumber)
                                .map((mday) => (
                                    <div
                                        key={`${mday.month}-${mday.day}`}
                                        className="daybox"
                                        style={{
                                            border: '1px solid #000',
                                            width: '15px',
                                            height: '15px',
                                            textAlign: 'center',
                                            lineHeight: '15px',
                                            fontSize: '8px'
                                        }}
                                    >
                                        {mday.day}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* {everyday} */}
        </React.Fragment>

    )
}
