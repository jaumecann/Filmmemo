import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';

const FactsModal = ({openModal, country}) => {

    const [countryFacts, setCountryFacts] = useState()
    const [daysDiff, setDaysDiff] = useState();
    const [yearData, setYearData] = useState([]);

    useEffect(()=>{
        
        (async() => {
            const response = await fetch(`http://localhost:5000/api/films/getCountryFacts/?ctry=${country}`);
            const info = await response.json();
            setCountryFacts(info)
            getSince(info?.last?.ratedate);
            getYearStats(info?.list)
            
        })();
    },[country])

    const getSince = (ratedate) => {
        const dataInicial = new Date(ratedate);
        const dataActual = new Date();
        const diff = dataActual - dataInicial;
        const daysGOne = Math.floor(diff / 86400000);
        setDaysDiff(daysGOne)
    }

    const getYearStats = (list) => {
        let yearObject = {};
        list.map(l => {
            const data = new Date(l.ratedate);
            const year = data.getFullYear();
            if(!yearObject[year]){
                yearObject[year] = 1;
            } else {
                yearObject[year] += 1;
            }
        })
        const years = Object.entries(yearObject).map(([clau, valor]) => {
            return { [clau]: valor * 2 };
          });

        setYearData(years)
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

        <section>

        </section>

    </div>)
}


export default FactsModal