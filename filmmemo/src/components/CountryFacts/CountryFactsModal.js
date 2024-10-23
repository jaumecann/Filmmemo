import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';

const FactsModal = ({openModal, country}) => {

    const [countryFacts, setCountryFacts] = useState()

    useEffect(()=>{
        
        (async() => {
            const response = await fetch(`http://localhost:5000/api/films/getCountryFacts/?ctry=${country}`);
            const info = await response.json();
            setCountryFacts(info)
        })();
    },[country])

    return (<div className={`${classes.modal} ${openModal ? classes.opening : ''}`}>
        <img alt="flag" src={`/flags/${country.trim()}.png`}></img>
        <div>{countryFacts?.stats?.name}</div>
        <section className={classes.databox}>
            <div className={classes.colddata}>
                <p>Total films: {countryFacts?.stats?.record_count}</p>
                <p>Average: {countryFacts?.stats?.average?.toFixed(2)}</p>
                <p>Frequency: {countryFacts?.stats?.percentage}%</p>
            </div>
        </section>
    </div>)
}


export default FactsModal