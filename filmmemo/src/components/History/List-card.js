import  Icon  from '@mui/material/Icon';
import classes from './List-card.module.css';


const ListCard = (props) => {

    const colors = ['#FF0000', '#FF0A00','#FF6500','#FF8700','#FFB400','#C7E000','#59C200','#01A300','#00852F'];

    const value = colors[props.rating-1]
    const findColor = {color:value}

    const loadDirector = (event) => {
        if (event.target.value) {
            props.onSelectDirector(event.target.value, props.directorname);
        }
    }
        
    

    return (
        <div className={classes.cardbox}>
            <div className={classes.titlesection}>
            <p className={classes.title}>{props.title}</p>
                <div className={classes.blocksdata}>
                    <div>
                        <ul>
                        <li>{props.year}</li>
                        <li className={classes.director} value={props.directorid} onClick={loadDirector}>
                            <span className={classes.icon}><Icon>theaters</Icon></span>{props.directorname}</li>
                        </ul>
                    </div>
                    <div className={classes.blockcountry}>
                <img alt='flag' src={`/flags/${props.country}.png`}></img>
                bla vla
                </div>
                </div>
             
            </div>
            <div className={classes.poster}>
            <img alt='poster' src={`/assets/${props.poster}`}></img>
            </div>
            <div className={classes.rating}>
                <div style={findColor}>
                {props.rating}
                </div>
            </div>
        </div>
    )
}

export default ListCard
