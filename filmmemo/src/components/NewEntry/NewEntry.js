import classes from './NewEntry.module.css';
import  Autocomplete  from '@mui/material/Autocomplete';
import { useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import * as React from 'react';
import { useFormState } from '../../shared/hooks/formstate-hook';
import { FilmRecord } from '../../shared/models/FilmRecord';
import FilmrecordContext from '../../shared/context/records-context';
import { useParams } from 'react-router-dom';

let dataModel = {
    country: '',
    director2: '',
    directorid: '',
    directorname: '',
    id: '',
    name: '',
    poster: '',
    ratedate: '',
    ratehour: '',
    rating:'',
    title: '',
    yearFilm: ''
}

const NewEntry = () => {
    const [countryList, setCountryList] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [isNewDirector, setIsNewDirector] = useState(false);
    const [newDirector, setNewDirector] = useState({name:'', country:''});
    const [inputprocesser, payload] = useFormState();
    const allrecords = React.useContext(FilmrecordContext)
    const getDirectors = async () => {
        const response = await fetch('http://localhost:5000/api/directors/alldirectors')
        const directors = await response.json();
        setDirectors(directors);
    }
    const filmID = useParams().id;
    const [filmData, setFilmData] = useState(dataModel);

    const onChangeInput = (event) => {
        setFilmData((currentData)=>{
            return {...currentData, [event.target.name]: event.target.value}
        })
    }

    const onChangeCountry = (e,v) => {
        setFilmData((currentData)=>{
            return  {...currentData, countryid: v.countryid, country:v.countryid, name: v.name}
        })
    }   


    const onChangeDirector = (e,v ) => {
        setFilmData((currentData)=>{
            console.log(v)
           return {...currentData, directorid: v.id, directorname: v.directorname}
        }
        )
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
    value={{countryid:filmData.country, name:filmData.name}}
    onChange={onChangeCountry}
    />

    const director = <Autocomplete
    className={`${classes.inputs} ${classes.countries}`}
    options={directors}
    selectOnFocus
    clearOnBlur
    getOptionLabel={(option) => option.directorname}
    isOptionEqualToValue = {(option, value)=>{
     return option.id === value.id
    }
    }
    onInputChange={(event, newValue) => {
         if (newValue.length >= 3 && directors.length < 1){
            getDirectors();
         }
        }}
    renderInput={(params) => <TextField {...params} label="Director"/>}
    onFocus={()=> {setIsNewDirector(false)}}
    value={{directorname: filmData.directorname, id:filmData.directorid}}
    onChange={onChangeDirector}
    />

/* https://stackoverflow.com/questions/46118340/i-cant-edit-text-field-in-material-ui */

    const title = <TextField label="Títol" variant='outlined' name="title" className={classes.inputs} value={filmData.title} style={{width:500}} onChange={onChangeInput}/>

    const year = <TextField label="Year" variant='outlined' name="yearFilm" className={classes.inputs} value={filmData.yearFilm} style={{width:100}} onChange={onChangeInput}/>

    const directorName = <TextField label="Nom" variant='outlined' className={classes.inputs} style={{width:300}} onBlur={(e) => { setNewDirector({...newDirector, name:e.target.value})}}/>

    const directorCountry = <Autocomplete 
            className={`${classes.inputs}`} 
            options={countryList}
            getOptionLabel={(option)=> option.name}
            isOptionEqualToValue={(option, value) => option.countryid === value.countryid}
            renderInput={(params) => <TextField {...params} label="Country" />}
            style={{width:200}}
            onChange={(e,v,r) => {setNewDirector({...newDirector, country: v.countryid})}}
            />
    


    const handleNewDirector = () => {
        setIsNewDirector(true);
    }

    const submitData = async () => {
        inputprocesser(filmData)
        console.log(payload)
      const allvalidated = Object.values(payload).every(i => i.isValid === true)
      
      if (!allvalidated) {
        alert('no todos los campos son validos')
        return
      }

      let record = new FilmRecord();
      record.title = payload.title.value;
      record.year = payload.yearFilm.value;
      record.country = payload.country.value
      record.director = payload.directorid.value;
      record.rate = payload.rating.value
      record.poster = payload.poster.value



      if (filmID){
        try{
            record.id = filmID
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(record)
            };

            await fetch('http://localhost:5000/api/films/update', requestOptions)
        } catch (e){
            console.log(e)
        } 
      } else {

        if (allrecords.collection.find((film)=> film.title.toLowerCase() === payload.title.value.toLowerCase())){
            alert(`ja existeix ${payload.title.value}`)
            return;
        }
      }

    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify(record)
    // };
    // try{
    //     await fetch('http://localhost:5000/api/films', requestOptions)
    // } catch (e){
    //     console.log(e)
    // } 
    }

    const submitDirector = async () => {
        console.log(newDirector);
        if (!newDirector.name || !newDirector.country){
            alert('falta per omplir nom o pais del director')
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newDirector)
        };

        try {
            await fetch('http://localhost:5000/api/directors', requestOptions)
        } catch (e){
            console.log(e)
        } 
    }

    useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries);
        })();

        if(filmID){
            // console.log(filmID)
            (async() => {
                const response = await fetch(`http://localhost:5000/api/films/getFilm/?id=${filmID}`);
                const filmdata = await response.json();
                setFilmData(filmdata[0])
            })();
        }
    },[]);

    // useEffect(()=> {
    //     console.log(lastfiveexample);
    // },[lastfiveexample])

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
                <div className={classes.sendDir} onClick={submitDirector}>
                    Enviar
                </div>
            </div>}
        </div>

        <div className={classes.attach_wrapper}>
            {filmData.poster && <div className={classes.poster}>
            <img alt='poster' src={`/assets/${filmData.poster}`}></img>
            </div>} 
            <TextField label="Poster" variant='outlined' name='poster' className={classes.inputs} value={filmData.poster} style={{width:400}} onChange={onChangeInput}/>
            <h3>Nota</h3>
            <Rating name="rating" min={1} max={10} value={filmData.rating}  className={classes.ratebar} onChange={onChangeInput}/>
        </div>
      </div>
     
     <div className={classes.submit}>
     <Button variant="contained" onClick={submitData}>Enviar</Button>
    </div>
    </React.Fragment>

    )
}

export default NewEntry