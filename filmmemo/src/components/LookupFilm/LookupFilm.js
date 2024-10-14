import { Autocomplete } from "@mui/material"
import { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import classes from './LookupFilm.module.css';
import { useNavigate } from "react-router-dom";


const LookupFilm = () => {

    const [filmsList, setFilmList] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{

        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const filmdata = await data.json();
            setFilmList(filmdata);
        })()
    },[]);


    return (
        <div>
            <h2>Look For a Film</h2>
            <Autocomplete
            className={classes.lookuper}
            options={filmsList}
            getOptionLabel={(option) => option.title}
            // isOptionEqualToValue = {(option, value)=>{
            //     console.log(`option: ${option}, value: ${value}`)
            //      return option.id === value.id
            // }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            renderInput={(params) => <TextField {...params} InputProps={{
                ...params.InputProps,
                style: {fontFamily: 'Acme'}
            }} label="Film"/>}
            sx={{border:'3px solid black', borderRadius:'10px', backgroundColor:'#f2d600'}}
            filterOptions={(options, state) => {
            if (state.inputValue.length > 2) {
            return options.filter((item) =>
            String(item.title)
              .toLowerCase()
              .includes(state.inputValue.toLowerCase())
            );
            }
            return options;
            }}
            renderOption={(props, option) => (
            <li style={{fontFamily:'Acme'}} {...props} key={option.id}>
            {option.title}
            </li>
             )}
             onInputChange={(event, newValue) => {
                const selectedFilm = filmsList.find((film) => film.title === newValue);
                 if (selectedFilm) {
                    navigate(`/film/${selectedFilm.id}`)
                }
            }
            }
            />
        </div>
    )
}


export default LookupFilm