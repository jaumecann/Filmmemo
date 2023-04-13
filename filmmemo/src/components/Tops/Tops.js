import { useState, useEffect } from 'react';
import React from "react";
import classes from './Tops.module.css'
import  Autocomplete  from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Tops = () => {

    const [countryList, setCountryList] = useState([]);

    const country = <Autocomplete
    className={`${classes.inputs} ${classes.countries}`}
    options={countryList}
    getOptionLabel={(option)=> option.name}
    isOptionEqualToValue={
        (option, value) => {
            return option.countryid === value.countryid
        }
    }
    renderInput={(params) => <TextField {...params} label="Country"/>}
    name="countryid"
  />

  
useEffect(()=>{
    (async() => {
        const response = await fetch('http://localhost:5000/api/films/countries');
        const countries = await response.json();
        setCountryList(countries);
    })();

},[]);

    return (
        <React.Fragment>
            <div className={classes.tops}>
            <h1>Tops</h1>
            <div className={classes.lookups}>
                <div>
                {country}
                </div>
            </div>
            </div>
            
        </React.Fragment>
    )
}

export default Tops