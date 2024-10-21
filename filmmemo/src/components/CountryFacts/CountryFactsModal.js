import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';

const FactsModal = ({openModal, country}) => {

    const [countryFacts, setCountryFacts] = useState()

    useEffect(()=>{
        
        (async() => {
            console.log('effe')
            const response = await fetch(`http://localhost:5000/api/films/getCountryFacts/?ctry=${country}`);
            // const countries = await response.json();
        })();
    },[country])

    return (<div className={`${classes.modal} ${openModal ? classes.opening : ''}`}>
        {country}
    </div>)
}


export default FactsModal