import { useState, useEffect, useRef} from "react";
import classes from './Monitor.module.css';
import { useNavigate}  from 'react-router-dom';

const Monitor = () => {

    const [unseenFilms, setUnseenFilms]= useState([])
    const [fullCollection, setFullCollection]= useState([])
    const navigate = useNavigate();
    const [listOfChecked, setListOfChecked] = useState([]);
    const [filterWishActive, setFilterWishActive] = useState(false);
    const nameRef = useRef();
    const directorRef = useRef();
    const countryRef = useRef();
    const yearRef = useRef();
    const [countriesAvailable, setCountriesAvailable] = useState([]);
    const [showDroplist, setShowDroplist] = useState(false);

    useEffect(()=>{

        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const filmdata = await data.json();
            const unseen = filmdata.filter(f => f.rating === null)
            setUnseenFilms(unseen);
            setFullCollection(unseen);
            setCountriesAvailable(current => {
                const updatedCountries = [...current]; // Copia del estado actual
                unseen.forEach((f) => {
                    if (!updatedCountries.includes(f.country)) {
                        updatedCountries.push(f.country);
                    }
                });
                return updatedCountries; // Devuelve el nuevo array
            })
    
            console.log(countriesAvailable)

            const wishfilms = await fetch(`http://localhost:5000/api/wishlist/wishList`);
            const wished = await wishfilms.json();
            const checkedDefault = [];
            wished.map(item => 
                checkedDefault.push(item.filmId)
            )
            setListOfChecked(checkedDefault)
        })()
    },[]);

    const goToDirectorHistory = (id, directorname) => {
        console.log(id)
        navigate('/history', { state: { id: id, name:directorname} });
    }

    const goToFilm = (id) => {
        navigate(`/film/${id}`)
    }

    const handleCheckboxChange = async (event, id) => {
      const checked = event.target.checked;
      let isAdding;
      checked ? isAdding = true : isAdding = false;
      setListOfChecked((listchecked) => {
        if (checked){
            return [...listchecked, id];
  
        } else {
            return listchecked.filter(item => item !== id)   
        }
      });

      const updateWishObject = {
        id:id,
        isAdding:isAdding
      }

      // Do something with the `checked` value
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updateWishObject)
        };

        try {
            await fetch('http://localhost:5000/api/wishlist', requestOptions)
        } catch (e){
            console.log(e)
        } 
    };

    const doSearch = () => {
        const name = nameRef.current.value;
        const director = directorRef.current.value;
        const country = countryRef.current.value;
        const years = yearRef.current.value;
        console.log(years)
        setUnseenFilms(current => {
            let newList = fullCollection.filter(
                f => 
                f.title.toLowerCase().includes(name.toLowerCase()) && 
                f.directorname.toLowerCase().includes(director.toLowerCase()) &&
                f.country.toLowerCase().includes(country.toLowerCase())
            )
            if(filterWishActive){
                newList = newList.filter(item => listOfChecked?.includes(item.id))
            }
            return newList;
        })
    }

    const handleWishFilter = (event) =>{
       event.target.checked ? 
            setFilterWishActive(true) :
            setFilterWishActive(false)
    }

    const displayCountries = (action) =>{
        setShowDroplist(action)
    }

    const setCountry = (country) => {
        countryRef.current.value = country;
        displayCountries(false)
    }
 
    return (<div>
    <div className={classes.wrapper}>
        <div className={classes.headers}>
            <div style={{width:'60px'}}></div>
            <div style={{width:'300px'}}><div>Name</div><input className={classes.filterbox}type="text" ref={nameRef}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span></div>
            <div style={{width:'80px', position:'relative'}}><div>Country</div><input onFocus={()=> displayCountries(true)}  className={classes.filterbox_short}type="text" ref={countryRef}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span>      
            {countriesAvailable && showDroplist && <div className={classes.droplist} onMouseLeave={()=>displayCountries(false)}>{countriesAvailable.map((c) => <div key={c} className={classes.dropitem} onClick={() => setCountry(c)}><span className={classes.dropspan}><img alt='flag' src={`/flags/${c.trim()}.png`}></img> {c}</span></div>)}</div>}</div>
            <div style={{width:'220px'}}><div>Director</div><input className={classes.filterbox}type="text" ref={directorRef}/>   <span className={classes.gotag} onClick={()=>doSearch()}>GO</span>
            </div>
            <div style={{width:'150px'}}><div>Year</div><input className={classes.filterbox_short}type="text" ref={yearRef}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span></div>
            <div style={{width:'30px'}}>
                <div>Wish</div>
                <div style={{display:'flex'}}><input type="checkbox" onChange={(event) => handleWishFilter(event)}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span></div>
            </div>
        </div>
    {unseenFilms && <div>
            {unseenFilms.map((f,i) => 
                <div key={f.id} className={classes.entry} >
                    <div style={{flexBasis:'30px'}}>{i+1}</div>
                    <div><img style={{width:'30px'}} alt="poster" src={`/assets/${f.poster}`}></img></div>
                    <div style={{padding:'0 5px', flexBasis:'300px'}} onClick={()=>goToFilm(f.id)}>{f.title}</div>
                    <div className={classes.flagy}><img alt='flag' src={`/flags/${f.country.trim()}.png`}></img></div>
                    <div className={classes.director} onClick={()=>goToDirectorHistory(f.directorid, f.directorname)}>{f.directorname}</div>
                    <div className={classes.year}>{f.yearFilm}</div>
                    <div className={classes.checkie}><input type="checkbox" checked={listOfChecked?.includes(f.id)} onChange={(event) => handleCheckboxChange(event, f.id)}></input></div>
                </div>
            )}
        </div>}
    </div>

    </div>)
}

export default Monitor