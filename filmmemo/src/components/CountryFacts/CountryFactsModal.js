import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';

const FactsModal = (props) => {

    console.log(props)

    return (<div className={`${classes.modal} ${props.openModal ? classes.opening : ''}`}>
        {props.country}
    </div>)
}

export default FactsModal