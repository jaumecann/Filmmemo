import {useEffect, useState} from 'react';

export function LastFive(){

    const [lastFive, setLastFive] = useState('')

    useEffect(()=>{
        const fetchLast5 = async () => {
            const response = await fetch('http://localhost:5000/lastFive')
            const data = await response.json();
            console.log(data)
            setLastFive(data.message);
        };
        
        fetchLast5();
    },[])

    return(
        <div>
            <h1>Last fiverrr</h1>
            <div>aquí {lastFive}</div>   
        </div>        
    )
}