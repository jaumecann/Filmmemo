 import React, { useEffect, useState } from "react";
 import classes from './Stats.module.css'
import { DayStats } from "../Days/Days-stats";
 
 const Stats = () => {

    const TabsEnum = {
        COUNTRIES: 'countries',
        DAYS: 'days',
        COUNTRIES_AVG: 'countries_avg',
        YEARS: 'years'
      };
    
    const [selectedTab, setSelectedTab] = useState(TabsEnum.COUNTRIES)
    const [totalCountries, setTotalCountries] = useState([]);
    const [totalYears, setTotalYears] = useState([]);


    useEffect(()=>{( async() => {
        try{
            const totalCountries = await fetch(`http://localhost:5000/api/films/getCountryCount`);
            const records = await totalCountries.json();
            setTotalCountries(records)
        } catch(err){
            alert(err)
        }
    })();
    },[])

    const getYearsData = ()=>{( async() => {
        try{
            const totalYears = await fetch('http://localhost:5000/api/days/yearsdata');
            const records = await totalYears.json();
            setTotalYears(records)
        } catch(err){
            alert(err)
        }
    })();
    }

    const countryRank = totalCountries.map( entry=> 
        <div key={entry.country} className={classes.country_row}>
            <div className={classes.no_bar_side}>
            <span className={classes.country_name}>{entry.name} </span>
            <span><img alt='flag' src={`/flags/${entry.country.trim()}.png`}></img></span>
            <span className={classes.count}> {entry.record_count} </span>
            </div>     
            <div 
                style={{
                    width: `${entry.record_count/2}px`,
                    backgroundColor: '#f7c43b',
                    border: 'solid 1px rgba(0,0,0,.2)',
                    height: '10px',
                    margin: '0 2px'
                }}
            ></div>
            <span>{entry.percentage}%</span>
        </div>
    )

    const countryAvg = [...totalCountries].sort((a,b) => b.average - a.average).map(entry=> 
        <div key={entry.country} className={classes.country_row}>
            <div className={classes.no_bar_side}>
            <span className={classes.country_name}>{entry.name} </span>
            <span><img alt='flag' src={`/flags/${entry.country.trim()}.png`}></img></span>
            <span className={classes.count}> {entry.record_count} </span>
            </div>     
            <div 
                style={{
                    width: `${entry.average*100}px`,
                    backgroundColor: entry.record_count >= 10 ? '#ff8e3e' : '#f7c43b',
                    border: 'solid 1px rgba(0,0,0,.2)',
                    height: '10px',
                    margin: '0 2px'
                }}
            ></div>
            <span>{entry.average.toFixed(2)}</span>
        </div>
    )

    const years = totalYears.map(year => 
        <div key={year.yearFilm} className={classes.country_row}> 
            <span>{year.yearFilm}</span>
            <div 
                style={{
                    width: `${year.record_count*5}px`,
                    backgroundColor: '#7bcdb5',
                    border: 'solid 1px rgba(0,0,0,.2)',
                    height: '10px',
                    margin: '0 2px'
                }}
            ></div>
            <span>{year.record_count}</span>
        </div>
        )


    return(
        <React.Fragment>
            <div className={classes.total_country}>
                <div className={classes.tabs}>
                    <div onClick={() => setSelectedTab(TabsEnum.COUNTRIES)}>Countries totals</div>
                    <div onClick={() => setSelectedTab(TabsEnum.COUNTRIES_AVG)}>Countries average</div>
                    <div onClick={() => setSelectedTab(TabsEnum.DAYS)}>Days</div> 
                    <div onClick={() => {setSelectedTab(TabsEnum.YEARS); getYearsData()}}>Years</div> 
                </div>
                {selectedTab === TabsEnum.COUNTRIES && <section>
                    {countryRank}   
                </section>}
                {selectedTab === TabsEnum.COUNTRIES_AVG && <section>
                    {countryAvg}   
                </section>}
                {selectedTab === TabsEnum.DAYS && <section>
                    <DayStats></DayStats>
                </section>}
                {selectedTab === TabsEnum.YEARS && <section>
                    {years}
                </section>}
                
            </div>
        </React.Fragment>
    )

}


export default Stats