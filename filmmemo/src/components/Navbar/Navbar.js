import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'

const Navbar = () => {

    return (
        <div className={classes.bar}>
            <div className={classes.baritem}>
            <NavLink to="/new_entry">New entry</NavLink>
            </div>
        </div>
    )
}

export default Navbar