 import React, { useEffect, useState } from "react"
 
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
        <div key={entry.name}>
            <span>{entry.name} </span>
            <span>{entry.record_count} </span>
            <div 
                style={{
                    width: `${entry.record_count/2}px`,
                    backgroundColor: 'blue',
                    height: '20px'
                }}
            ></div>
            <span>{entry.percentage}</span>
        </div>
    )

    return(
        <React.Fragment>
            <div>{countryRank}</div>
        </React.Fragment>
    )

}


export default Stats