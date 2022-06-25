import React, {useEffect, useState} from 'react';
import Last5Item from './Last5Item';
import classes from './LastFive.module.css';

export function LastFive(){

    const [lastFive, setLastFive] = useState([]);

    useEffect(()=>{
        const fetchLast5 = async () => {
            const response = await fetch('http://localhost:5000/lastfive')
            const data = await response.json();
            console.log(data)
            setLastFive(data);
        };
        
        fetchLast5();
    },[]);

    const lastfiveItems = lastFive.map((item) => 
     <Last5Item key={item.id} 
     title={item.title} 
     year={item.year} 
     date={item.date} 
     director={item.director} 
     country={item.country}
     img={item.img}
     rating={item.rating} />
    );

    return(
    <React.Fragment>
    <h2 className={classes.headerlast5}>Last 5 seen</h2>
     <div className={classes.last5area}> {lastfiveItems}</div>       
    </React.Fragment> 
    )
    }