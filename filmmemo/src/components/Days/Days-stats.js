
import React, { useEffect, useState } from 'react'

export const DayStats = () => {


    const year = {
        january:{month:1, days:31},
        february:{month:2, days:29}
    }


    const [alldays, setAllDays] = useState([]);


    const everyday = alldays.map(day => {
        return <div key={`${day.day}${day.month}`}>{day.day}</div>
    })

    useEffect (() =>{
        let months = Object.keys(year)
        for (const month of months){
            for(let i = 1; i < year[month].days; i++){
                setAllDays((prevDays) => [...prevDays, {day:i, month:year[month].month}])
            }
        }
    },[])

    return (
        <React.Fragment>
            <h1>tranqui tronqui</h1>
            {everyday}
        </React.Fragment>

    )
}
