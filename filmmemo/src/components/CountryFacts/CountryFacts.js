import React, { useState, useEffect } from 'react'; 
import classes from './CountryFacts.module.css';

const CountryFacts = () => {

    const [countryList, setCountryList] = useState([]);
    const [countCountries, setCountCountries] = useState([]);

    useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries.filter(c => c.population > 230000));
        })(); 
    },[]);

    useEffect(()=>{( async() => {
        try{
            const totalCountries = await fetch(`http://localhost:5000/api/films/getCountryCount`);
            const records = await totalCountries.json();
            setCountCountries(records)
        } catch(err){
            alert(err)
        }
    })();
    },[])

 return (<div>
    {countryList && <div className={classes.wrapflags}>
        {countryList.map(ctry => 
            <div key={ctry.countryid} className={classes.cardflag}  style={{
                    backgroundColor: countCountries.find(c => c.country === ctry.countryid) ?'#fcf9e6' : '#ffffff',
                    opacity: countCountries.find(c => c.country === ctry.countryid) ? '1' : '0.5'
                }}
                >
                <img alt="flag" src={`/flags/${ctry.countryid.trim()}.png`}></img>
                <div>{ctry.name}
                </div>
            </div>
        )}
        </div>}
 </div>)
}

export default CountryFacts