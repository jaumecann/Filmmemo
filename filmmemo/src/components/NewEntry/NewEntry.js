import classes from './NewEntry.module.css';
import  Autocomplete  from '@mui/material/Autocomplete';
import { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';

const NewEntry = () => {
    const [countryList, setCountryList] = useState([]);
    const [directors, setDirectors] = useState([]);

    const [directorSelected, setDirectorSelected] = useState({});

    const directorRef = useRef();

//    directorRef.current.value;

    const getDirectors = async () => {
        const response = await fetch('http://localhost:5000/api/directors/alldirectors')
        const directors = await response.json();
        setDirectors(directors);
    }

    const testudo = () => { console.log(directorSelected)}

    const country = <Autocomplete
    className={`${classes.inputs} ${classes.countries}`}
    options={countryList}
    getOptionLabel={(option)=> option.name}
    isOptionEqualToValue={(option, value) => option.countryid === value.countryid}
    renderInput={(params) => <TextField {...params} label="Country" />}
    />

    const director = <Autocomplete
    options={directors}
    freeSolo
    selectOnFocus
    clearOnBlur
    getOptionLabel={(option) => option.directorname}
    onInputChange={(event, newValue) => {
         if (newValue.length >= 3 && directors.length < 1){
            getDirectors();
         }
        }}
    renderInput={(params) => <TextField {...params} label="Director" />}
    ref={directorRef}
    onChange={(e,v,r) => {setDirectorSelected(v)}}
    />

    const title = <TextField label="Títol" variant='outlined' className={classes.inputs} style={{width:400}}/>
    const year = <TextField label="Year" variant='outlined' className={classes.inputs} style={{width:100}}/>

    useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries);
        })();
    },[])

    return (
        <div className={classes.wrapper}>
            <div className={classes.row}>
                {title}
                {year}
            </div>
            <div>
                {country}
            </div>
            <div>
                {director}
            </div>
            <div onClick={testudo}>
                Submit
            </div>

        </div>
    )
}

export default NewEntry