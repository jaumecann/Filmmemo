import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';

const FactsModal = ({openModal, country}) => {

    const [countryFacts, setCountryFacts] = useState()
    const [daysDiff, setDaysDiff] = useState();

    useEffect(()=>{
        
        (async() => {
            const response = await fetch(`http://localhost:5000/api/films/getCountryFacts/?ctry=${country}`);
            const info = await response.json();
            setCountryFacts(info)
            getSince(info?.last?.ratedate)
        })();
    },[country])

    const getSince = (ratedate) => {
        const dataInicial = new Date(ratedate);
        const dataActual = new Date();
        const diff = dataActual - dataInicial;
        const daysGOne = Math.floor(diff / (1000 * 60 * 60 * 24));
        setDaysDiff(daysGOne)
    }


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
        <section className={classes.lastseen}>
        <div className={classes.img_last}>
        <img alt="flag" src={`/assets/${countryFacts?.last?.poster}`}></img>
        </div>
        <div className='last_text'>
            Last seen: <span style={{backgroundColor:'#ffa200', padding:'0 3px 0 4px',
    borderRadius: '6px'}}>{countryFacts?.last?.title}</span>
            <p>Fa {daysDiff} dies</p>
        </div>
        </section>
    </div>)
}


export default FactsModal