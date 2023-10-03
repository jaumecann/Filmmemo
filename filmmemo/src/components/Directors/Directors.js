import React from "react";
import { useNavigate } from 'react-router-dom';
import classes from './Directors.module.css';
import { useState,useEffect } from "react";
import { Pagination } from "@mui/material";
import FilmrecordContext from '../../shared/context/records-context';
import  Autocomplete  from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Directors = () => {

    const [bestDirectors, setBestDirector] = useState([]);
    const [minimum, setMinimum] = useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 10;
    const allrecords = React.useContext(FilmrecordContext);
    const [selectedDirectors, setSelectedDirectors] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate();

    const handleBestDirectorSearch = async () => {
        try{
           const directors = await fetch(`http://localhost:5000/api/directors/best?min=${minimum}&country=${selectedCountry}`)
           const data = await directors.json();
           setBestDirector(data)
        } catch{

        }
    }

    const handleMinimumChange = (event) => {
        let min = event.target.value
        if (Number(min)){
            setMinimum(min)
        } else if (min && !Number(min)) {
            alert('el mínim ha de ser un número, tanoca')
            setMinimum(1)
        } else {
            setMinimum(1)
        }
        
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleCountryPick = (event, value) => {
        value === null ?
        setSelectedCountry('') :
        setSelectedCountry(value.countryid)
      }

    const showFilms = (director, film_ids) => {
        setSelectedDirectors((previous) => {
        if(previous.includes(director)){
            return previous.filter(id => id !== director)
        } else {
            return [...previous, director]
        }
        })
        let filmsOfSelectedDirector = film_ids.split(',');
        filmsOfSelectedDirector = filmsOfSelectedDirector.map(f => +f)
        let filmsItems = allrecords.collection.filter((record) => 
           filmsOfSelectedDirector.includes(record.id)
        )
        
    }

    const country = <Autocomplete
    className={classes.countries}
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



    useEffect(() => {
        setTotalPages(Math.ceil(bestDirectors.length / itemsPerPage));
        setPage(1);
      }, [bestDirectors]);

      useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries);
        })();
    
    },[]);

    return (
        <React.Fragment>
            <div className={classes.commandrow}>
                <div className={classes.best_avg}>
                Minimun films <input className={classes.best_avg_input} onChange={handleMinimumChange}></input>
                <div className={classes.country_input}>
                {country}
                </div>
                <button  onClick={handleBestDirectorSearch}>Best rating</button>
                </div>     
                
            </div>
            
            <div className={classes.list}>
                {bestDirectors.slice((page-1)*itemsPerPage, page*itemsPerPage).map((item, idx) => 
                    <div key={item.directorid} className={classes.datarow} 
                    onClick={() => showFilms(item.directorid, item.film_ids)}> 
                        <span>{idx+1}</span><b className={classes.directorname}> {item.directorname}</b><span className={classes.avg}>{item.avrg.toFixed(2)}</span><span className={classes.totals}>{item.totalfilms}</span><span className={classes.country}><img alt='flag' src={`/flags/${item.directorcountry.trim()}.png`}></img></span>
                    {selectedDirectors.includes(item.directorid) && <div className={classes.postercontainer}>
                        {allrecords.collection.filter((record)=>{return record.directorid === item.directorid}).map(item => 
                            <div className={classes.posterlist} key={item.id}>
                                <img alt='poster' src={`/assets/${item.poster}`}></img>
                                <div className={classes.posterraiting}>{item.rating}</div>
                                <div className={classes.postername} onClick={()=> {navigate(`/film/${item.id}`)}}>{item.title}</div>
                            </div>)
                        }
                </div>}
                </div>
                )
                }
            </div>
            <div>
                {bestDirectors && <Pagination
                count={totalPages}
                page={page}
                defaultPage={1}
                showFirstButton
                showLastButton
                onChange={handleChange}
                />}
            </div>
        </React.Fragment>
    )
}

export default Directors