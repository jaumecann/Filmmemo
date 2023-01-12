import classes from './List-card.module.css';

const ListCard = (props) => {

    const colors = ['#FF0000', '#FF0A00','#FF6500','#FF8700','#FFB400','#C7E000','#59C200','#01A300','#00852F'];

    const value = colors[props.rating-1]
    const findColor = {color:value}

    return (
        <div className={classes.cardbox}>
            <div>
            <p className={classes.title}>{props.title}</p> 
            {props.year}
            </div>
            <div className={classes.poster}>
            <img alt='poster' src={`/assets/${props.poster}`}></img>
            {props.poster}
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
