
import classes from './App.module.css';
import { LastFive } from './components/LastFive/LastFive';
import NewEntry from './components/NewEntry/NewEntry';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
  NavLink
} from 'react-router-dom';
import * as React from 'react'
import Navbar from './components/Navbar/Navbar';

function App() {

  let routes;

  routes = (
    <Routes>
      <Route exact path="/" element={<LastFive />}/>
      <Route path="/new_entry" element={<NewEntry />}/>     
    </Routes>
   

  );

  return (
    <React.Fragment>
    <Router>
    <div>
      <header className={classes.header}>
        <NavLink to='/'>
        Film<span className={classes.yellow}>History</span>
        </NavLink>   
      </header>
    </div>
    <Navbar />
      {routes}
    </Router>
    </React.Fragment>
 
  );
}

export default App;
