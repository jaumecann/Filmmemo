import { useState, useEffect } from 'react';
import React from "react";
import classes from './Tops.module.css'
import  Autocomplete  from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Tops = () => {

    const [countryList, setCountryList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDirector, setSelectedDirector] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [theList, setTheList] = useState([]);
    const navigate = useNavigate();

    const handleCountryPick = (event, value) => {
        setSelectedCountry(value)
        setSelectedDirector('')
        setSelectedYear('')
      }

      const handleDirectorPick = (event, value) => {
        setSelectedDirector(value)
        setSelectedCountry('')
        setSelectedYear('')
      }

      const handleYearInput = (event) => {
        setSelectedYear(event.target.value)
        setSelectedCountry('')
        setSelectedDirector('')
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
    // value={{countryid:selectedCountry.country, name:selectedCountry.name}}
    // inputValue={selectedCountry ? selectedCountry.name : ""}
  />

    const director = <Autocomplete
    className={`${classes.inputs} ${classes.countries}`}
    options={directorList}
    selectOnFocus
    clearOnBlur
    getOptionLabel={(option)=> option.directorname}
    isOptionEqualToValue={
    (option, value) => {
        return option.id === value.id
    }
    }
    renderInput={(params) => <TextField {...params} label="Director"/>}
/*     name="countryid" */
    onChange={handleDirectorPick}
    />

    const yearFilm = <TextField label="Year" variant='outlined' name="yearFilm" style={{width:100}} onChange={handleYearInput} value={selectedYear}/>



  const topize = async () => {
    console.log(selectedDirector.id)
    const country = selectedCountry && selectedCountry.countryid? selectedCountry.countryid : null;
    const director = selectedDirector && selectedDirector.id? selectedDirector.id : null;
    const year = selectedYear ? selectedYear : null
        try{
           const response = await fetch(`http://localhost:5000/api/films/getTops?country=${country}&director=${director}&year=${year}`)
            const items = await response.json();
            setTheList(items)
        }catch(e){
            console.error(e);
        }
    }
  

  
useEffect(()=>{
    (async() => {
        const response = await fetch('http://localhost:5000/api/films/countries');
        const countries = await response.json();
        setCountryList(countries);
    })();

    (async() => {
        const response = await fetch('http://localhost:5000/api/directors/alldirectors');
        const directors = await response.json();
        setDirectorList(directors);
    })();

},[]);

const navigateToFilm = (id) => {
    navigate(`/film/${id}`)
}

    return (
        <React.Fragment>
            <div className={classes.tops}>
            <h1>Tops</h1>
            <div className={classes.lookups}>
                <div className={classes.boxes}>
                {country}
                </div>
                <div className={classes.boxes}>
               {director}
                </div>
                <div>
                {yearFilm}
                </div>
                <div>
                <button className={classes.top_button} onClick={topize}>Topitza films!</button>
                </div>
            </div>
            <section className={classes.render_films_area}>
                {theList.map((item, index) =>{
                    const counter = index +1
                    return  <div key={item.id} className={classes.topview}>
                        <div>{counter}</div>
                        <img alt='img' src={`/assets/${item.poster}`}></img>
                        <div>
                        <p onClick={()=>{navigateToFilm(item.id)}}>{item.title}</p>
                        <div>{item.yearFilm}</div>
                        <div className={classes.rating}>{item.rating}</div>
                        </div>
                    </div>  
                }          
                )}  
                </section>
             
            </div>
            
        </React.Fragment>
    )
}

export default Tops