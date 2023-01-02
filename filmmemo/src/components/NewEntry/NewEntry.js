import classes from './NewEntry.module.css';
import  Autocomplete  from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const NewEntry = () => {
    const [countryList, setCountryList] = useState([]);
    const [directors, setDirectors] = useState(['tito', 'nano']);

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
    onInputChange={(event, newValue) => { console.log(event); console.log(newValue)}}
    renderInput={(params) => <TextField {...params} label="Director" />}
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

        </div>
    )
}

export default NewEntry