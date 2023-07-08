import { useState, useEffect } from 'react';
import React from "react";
import classes from './Tops.module.css'
import  Autocomplete  from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Tops = () => {

    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [theList, setTheList] = useState([]);

    const handleCountryPick = (event, value) => {
        setSelectedCountry(value)
      }

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
    onChange={handleCountryPick}
  />



  const topize = async () => {
    if(selectedCountry){
        try{
           const response = await fetch(`http://localhost:5000/api/films/getTops?country=${selectedCountry.countryid}`)
            const items = await response.json();
            setTheList(items)
        }catch(e){
            console.error(e);
        }
    }
  }

  
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
                <div>
                <button className={classes.top_button} onClick={topize}>Topitza!</button>
                </div>
            </div>
                <section className={classes.render_films_area}>
                {theList.map(item =>  
                    <div className={classes.topview}>
                        <img alt='img' src={`/assets/${item.poster}`}></img>
                        <div>
                        <p>{item.title}</p>
                        <div>{item.yearFilm}</div>
                        </div>
                    </div>      
                    
                )}  
                </section>
             
            </div>
            
        </React.Fragment>
    )
}

export default Tops