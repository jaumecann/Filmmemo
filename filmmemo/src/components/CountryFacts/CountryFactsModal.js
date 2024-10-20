import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';

const FactsModal = ({openModal, country}) => {

    return (<div className={`${classes.modal} ${openModal ? classes.opening : ''}`}>
        {country}
    </div>)
}

export default FactsModal