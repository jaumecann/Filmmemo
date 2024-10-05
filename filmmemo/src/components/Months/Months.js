import { useState, useEffect } from "react";
import React from "react";
import FilmrecordContext from "../../shared/context/records-context";

export const Months = () =>{

    const [monthsData, setMonthsData] = useState([]);
    const context = React.useContext(FilmrecordContext)

    useEffect(()=>{
        if(context.days_collection.length>0){
            let totals = {};
            let breakdown = {}

            for(let day of context.days_collection){
                const month = day.day_month.slice(0,2);
                totals[month]? totals[month] += day.record_count : totals[month] = day.record_count
                const years_for_day = day.years_for_day.split(',');
                const allyears = years_for_day.map(y => y.trim());
                for(let year of allyears){
                    if (breakdown[year]){
                        breakdown[year][month] ? breakdown[year][month] += 1 : breakdown[year][month] = 1
                    } else {
                        breakdown[year] = {};
                    }
                }
            }
            console.log(breakdown)
        }
    })
    
    return (
        <React.Fragment>
            <div>Works</div>
        </React.Fragment>
    )
}