import { Autocomplete } from "@mui/material"
import { useState, useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import classes from './LookupFilm.module.css';
import FilmrecordContext from '../../shared/context/records-context';


const LookupFilm = () => {

    const [filmsList, setFilmList] = useState([])
    const allrecords = useContext(FilmrecordContext)

    useEffect(()=>{
      console.log(allrecords)
    },[]);

    return (
        <div>
            <h2>Look For a Film</h2>
            <Autocomplete
            className={classes.lookuper}
            options={filmsList}
            renderInput={(params) => <TextField {...params} InputProps={{style: {fontFamily: 'Acme'}}} label="Film"/>}
            sx={{border:'3px solid black', borderRadius:'10px', backgroundColor:'#f2d600'}}
            />
        </div>
    )
}


export default LookupFilm