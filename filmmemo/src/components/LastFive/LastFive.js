import React, {useEffect, useState} from 'react';
import LittleCard from './LittleCard';
import classes from './LastFive.module.css';

export function LastFive(props){

    const [lastFive, setLastFive] = useState([]);

    useEffect(()=>{
        const fetchLast5 = async () => {
            const response = await fetch('http://localhost:5000/api/films/lastfive')
            const data = await response.json();
            console.log(data)
            setLastFive(data);    
        };
        fetchLast5();
      
    },[]);


    const lastfiveItems = lastFive.map((item) => 
     <LittleCard key={item.id} 
     title={item.title} 
     year={item.yearFilm} 
     date={item.ratedate} 
     director={item.directorid} 
     country={item.country.trim()}
     img={item.poster}
     rating={item.rating} />
    );

    return(
    <React.Fragment>
    <h2 className={classes.headerlast5}>Last 5 seen</h2>
     <div className={classes.last5area}> {lastfiveItems}</div>       
    </React.Fragment> 
    )
    }