import { useNavigate } from 'react-router-dom';
import classes from './LittleCard.module.css'

const LittleCard = (props) => {

const navigate = useNavigate();

const rateclasses = () => {

    let colorstyle = '';
    let gradesToClasses = {
        9 : "nine",
        8 : "eight",
        7 : "seven",
        6 : "six",
        5 : "five",
        4 : "four",
        3 : "three",
        2 : "two",
        1 : "one"
    }

    colorstyle = gradesToClasses[`${props.rating}`]
    return `${classes.rating} ${classes[`${colorstyle}`]}` 
};

const navigateToFilm = (id) => {
    navigate(`/film/${id}`)
}


return (
    <div className={classes.card}>
         <div className={classes.poster}>
            <img alt='poster' src={`/assets/${props.img}`}></img>
         </div> 
         {/* <div className={classes.rating}>{props.rating}</div> */}
         {/* <div className={`${classes['rating']} ${props.rating > 5 && classes.over} ${props.rating < 5 && classes.under}`}>{props.rating}</div> */}
         <div className={rateclasses()}>{props.rating}</div>
         <div className={classes.ratedate}>{props.date.slice(0,4)}</div>
         <div className={classes.filmdata}>
            <h4 onClick={()=>{navigateToFilm(props.id)}}>{props.title} </h4>
            <div className={classes.flag}><img alt='flag' src={`/flags/${props.country}.png`}></img></div>
            <div className={classes.year}>{props.year}</div>
         </div>
    </div>
)
};


export default LittleCard