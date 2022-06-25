import classes from './Last5Item.module.css'

const Last5Item = (props) => {

return (
    <div className={classes.card}>
         <h4>{props.title}</h4>
         <img src={`/assets/${props.img}.jpg`}></img>
         
    </div>
)
};


export default Last5Item