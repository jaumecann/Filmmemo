import { useState, useEffect } from "react";
import React from "react";
import FilmrecordContext from "../../shared/context/records-context";
import classes from './Months.module.css';

export const Months = () =>{

    const [monthsData, setMonthsData] = useState([]);
    const [monthsDetailData, setMonthsDetailData] = useState([]);
    const context = React.useContext(FilmrecordContext);
    const [expandedYears, setExpandedYears] = useState([]);

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
                //si hi ha algun dia que suma una barbaritat vol dir que aquell dia es va votar en massa -> es modifica
                if(day.record_count > 100){
                    day.record_count = 10;
                }
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

            setMonthsData(Object.entries(totals).map(([month,totals]) => { return {month,totals}})); 
            let detail= Object.entries(breakdown).map(([year,months]) => {
                return {year, monthEntries:Object.entries(months).map(([month,totals]) => ({month,totals}))}}
            )
            setMonthsDetailData(detail)
        }
        processData();
    },[context])

    const toggleYear = (year) => {
        setExpandedYears((prevExpandedYears) =>
          prevExpandedYears.includes(year)
            ? prevExpandedYears.filter((y) => y !== year) 
            : [...prevExpandedYears, year] 
        );
      };
    
    return (
        <React.Fragment>
            <div className={classes.monthbox} >
                {monthsData.sort(function(a, b){return a.month - b.month}).map((m,i) => (
                    
                    <div key={m.month}>
                        <div className={classes.graphic} 
                        style={{
                        height:`${m.totals/2}px`,
                        border:"solid 1px #dea918",
                        padding:"5px",
                        boxShadow: "2px 0px 3px #b96c36",
                    }}>    
                    {m.totals}                 
                        </div>
                        <div style={{textAlign:"center", fontFamily:"Racing Sans One"}}>{transformMonths(m.month)}</div>
                    </div>
                ))}
            </div>
            <div >
                {monthsDetailData.sort(function(a, b){return b.year - a.year}).map((data) => (
                    <div key={data.year} className={classes.yearblock}>
                        <div onClick={()=>toggleYear(data.year)}>
                        {data.year}
                        </div>
                        {expandedYears.includes(data.year) && (
                            <div className={classes.monthbox}>
                            {data.monthEntries.sort(function(a, b){return a.month - b.month}).map((m,i) => (
                    
                            <div key={m.month}>
                            <div className={classes.graphic2} 
                            style={{
                            height:`${m.totals*2}px`,
                            border:"solid 1px #ad7f02",
                            padding:"5px",
                            boxShadow: "2px 0px 3px #b96c36",
                            }}>    
                                            
                            </div>
                            <div style={{textAlign:"center", fontFamily:"Racing Sans One"}}>{transformMonths(m.month)} <span>({m.totals})</span> </div>
                            </div>
                            ))}    
                        </div>
                    )}                
                    </div>
                )
            )}
            </div>
        </React.Fragment>
    )
}