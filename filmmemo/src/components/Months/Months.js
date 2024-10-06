import { useState, useEffect } from "react";
import React from "react";
import FilmrecordContext from "../../shared/context/records-context";
import classes from './Months.module.css';

export const Months = () =>{

    const [monthsData, setMonthsData] = useState([]);
    const context = React.useContext(FilmrecordContext);

    const transformMonths = (month) => {
        const months = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December"
          };

          const result = months[month];
          return result;
    }

    useEffect(()=>{
        const processData = async () => {
   
            let totals = {};
            let breakdown = {};
            let days_data;

            if(context.days_collection.length > 0){
                days_data = context.days_collection
            } else {
                const response = await fetch('http://localhost:5000/api/days/dateinsight');
                days_data = await response.json();
                context.updateDays(days_data);
            }

            for(let day of days_data){
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
            setMonthsData(Object.entries(totals).map(([month,totals]) => ({month,totals}))); 
        }
        processData();
    },[context.days_collection, context.updateDays])
    
    return (
        <React.Fragment>
            <div className={classes.monthbox} >
                {monthsData.sort(function(a, b){return a.month - b.month}).map((m,i) => (
                    
                    <div key={m.month}>
                        <div className={classes.graphic} 
                        style={{
                        height:`${m.totals/2}px`,
                    }}>    
                    {m.totals}                 
                        </div>
                        <div style={{textAlign:"center", fontFamily:"Racing Sans One"}}>{transformMonths(m.month)}</div>
                    </div>
              
                ))}
            </div>
        </React.Fragment>
    )
}