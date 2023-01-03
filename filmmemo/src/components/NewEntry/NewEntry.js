import classes from './NewEntry.module.css';
import  Autocomplete  from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import * as React from 'react';

const NewEntry = () => {
    const [countryList, setCountryList] = useState([]);
    const [directors, setDirectors] = useState([]);

    const [directorSelected, setDirectorSelected] = useState({});
    const [isNewDirector, setIsNewDirector] = useState(false);

//    directorRef.current.value;

    const getDirectors = async () => {
        const response = await fetch('http://localhost:5000/api/directors/alldirectors')
        const directors = await response.json();
        setDirectors(directors);
    }

    const country = <Autocomplete
    className={`${classes.inputs} ${classes.countries}`}
    options={countryList}
    getOptionLabel={(option)=> option.name}
    isOptionEqualToValue={(option, value) => option.countryid === value.countryid}
    renderInput={(params) => <TextField {...params} label="Country" />}
    />

    const director = <Autocomplete
    className={`${classes.inputs} ${classes.countries}`}
    options={directors}
    selectOnFocus
    clearOnBlur
    getOptionLabel={(option) => option.directorname}
    onInputChange={(event, newValue) => {
         if (newValue.length >= 3 && directors.length < 1){
            getDirectors();
         }
        }}
    renderInput={(params) => <TextField {...params} label="Director" />}
    onFocus={()=> {setIsNewDirector(false)}}
    onChange={(e,v,r) => {setDirectorSelected(v)}}
    />

    const title = <TextField label="Títol" variant='outlined' className={classes.inputs} style={{width:500}}/>
    const year = <TextField label="Year" variant='outlined' className={classes.inputs} style={{width:100}}/>
    const directorName = <TextField label="Nom" variant='outlined' className={classes.inputs} style={{width:300}}/>
    const directorCountry = <Autocomplete 
            className={`${classes.inputs}`} 
            options={countryList}
            getOptionLabel={(option)=> option.name}
            isOptionEqualToValue={(option, value) => option.countryid === value.countryid}
            renderInput={(params) => <TextField {...params} label="Country" />}
            style={{width:200}}
            />

    const handleNewDirector = () => {
        setIsNewDirector(true);
    }

    useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries);
        })();
    },[])

    return (
    <React.Fragment>
      <div className={classes.flex}>
        <div className={classes.wrapper}>
            <div className={classes.row}>
                {title}
                {year}
            </div>
            <div>
                {country}
            </div>
            <div className={classes.row}>
                {director}
                <div onClick={handleNewDirector} className={classes.newD}>Nou director</div>
            </div>
            {isNewDirector && <div className={`${classes.newDirArea}`}>
                <div className={`${classes.row}`}>
                    {directorName}
                    {directorCountry}
                </div>
                <div className={classes.sendDir}>
                    Enviar
                </div>
            </div>}
        </div>

        <div className={classes.attach_wrapper}>
            <TextField label="Poster" variant='outlined' className={classes.inputs} style={{width:400}}/>
            <h3>Nota</h3>
            <Rating name="customized-10" min={1} max={10} className={classes.ratebar} onChange={(e,v) => {console.log(v)}}/>
        </div>
      </div>
     
     <div className={classes.submit}>
     <Button variant="contained" >Enviar</Button>
    </div>
    </React.Fragment>

    )
}

export default NewEntry