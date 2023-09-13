 import React, { useEffect, useState } from "react";
 import classes from './Stats.module.css'
 
 const Stats = () => {
    const [totalCountries, setTotalCountries] = useState([]);

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

    return(
        <React.Fragment>
            <div className={classes.total_country}>{countryRank}</div>
        </React.Fragment>
    )

}


export default Stats