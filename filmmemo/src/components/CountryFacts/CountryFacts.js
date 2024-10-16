import React, { useState, useEffect } from 'react'; 
import classes from './CountryFacts.module.css';

const CountryFacts = () => {

    const [countryList, setCountryList] = useState([]);

    useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries);
        })(); 
    },[]);

 return (<div>
    {countryList && <div className={classes.wrapflags}>
        {countryList.map(ctry => 
            <div key={ctry.countryid}>
                <img alt="flag" src={`/flags/${ctry.countryid.trim()}.png`}></img>
            </div>
        )}
        </div>}
 </div>)
}

export default CountryFacts