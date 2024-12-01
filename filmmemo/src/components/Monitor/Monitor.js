import { useState, useEffect} from "react";
import classes from './Monitor.module.css';
import { useNavigate}  from 'react-router-dom';

const Monitor = () => {

    const [unseenFilms, setUnseenFilms]= useState([])
    const navigate = useNavigate();
    const [listOfChecked, setListOfChecked] = useState([]);

    useEffect(()=>{

        (async() => {
            const data = await fetch(`http://localhost:5000/api/films/getAllPlus`);
            const filmdata = await data.json();
            const unseen = filmdata.filter(f => f.rating === null)
            console.log(unseen);
            setUnseenFilms(unseen);

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

    const handleCheckboxChange = (event, id) => {
      const checked = event.target.checked;
      setListOfChecked((listchecked) => {
        if (checked){
            return [...listchecked, id];
        } else {
            return listchecked.filter(item => item !== id)
        }
      });
      // Do something with the `checked` value
    };


    return (<div>
    <div className={classes.wrapper}>
        <div className={classes.headers}>
            <span style={{width:'60px'}}></span>
            <span style={{width:'300px'}}>Name</span>
            <span style={{width:'80px'}}>Country</span>
            <span style={{width:'220px'}}>Director</span>
            <span style={{width:'100px'}}>Year</span>
            <span style={{width:'30px'}}>Wish</span>
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