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

    useEffect(()=>{

        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const filmdata = await data.json();
            const unseen = filmdata.filter(f => f.rating === null)
            setUnseenFilms(unseen);
            setFullCollection(unseen)

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
        setUnseenFilms(current => {
            let newList = fullCollection.filter(
                f => 
                f.title.toLowerCase().includes(name.toLowerCase()) && 
                f.directorname.toLowerCase().includes(director.toLowerCase()))
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

    return (<div>
    <div className={classes.wrapper}>
        <div className={classes.headers}>
            <div style={{width:'60px'}}></div>
            <div style={{width:'300px'}}><div>Name</div><input className={classes.filterbox}type="text" ref={nameRef}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span></div>
            <div style={{width:'80px'}}>Country</div>
            <div style={{width:'220px'}}><div>Director</div><input className={classes.filterbox}type="text" ref={directorRef}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span></div>
            <div style={{width:'100px'}}>Year</div>
            <div style={{width:'30px'}}><div>Wish</div><input type="checkbox" onChange={(event) => handleWishFilter(event)}/><span className={classes.gotag} onClick={()=>doSearch()}>GO</span></div>
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