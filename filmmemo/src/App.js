
import classes from './App.module.css';
import { LastFive } from './components/LastFive/LastFive';
import NewEntry from './components/NewEntry/NewEntry';
import History from './components/History/History';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink
} from 'react-router-dom';
import * as React from 'react'
import Navbar from './components/Navbar/Navbar';
import FilmrecordContext from './shared/context/records-context';

function App() {

  let routes;

  const [everything, setEverything] = React.useState([])

  // const addLastFive = (lastfive) => {
  //   console.log(lastfive)
  //   setLastFiveExampleContext(lastfive)
  // }

  // const dotha = () => {console.log(lastfiveExampleContext[2].title)}

  routes = (
    <Routes>
      <Route exact path="/" element={<LastFive />}/>
      <Route path="/new_entry" element={<NewEntry />}/>     
      <Route path="/history" element={<History/>}/>
    </Routes>
  );

  React.useEffect(()=>{
    const fetchEverything= async () => {
      const response = await fetch('http://localhost:5000/api/films/getAll')
      const data = await response.json();
      setEverything(data)  
  };
  fetchEverything();
  },[])

  return (
    <FilmrecordContext.Provider
      value={{collection: everything}}
    >
    <Router>
    <div>
      <header className={classes.header}>
        <NavLink to='/'>
        Film<span className={classes.yellow}>History</span>
        </NavLink>   
      </header>
    </div>
    {/* {lastfiveExampleContext.length > 0 && <div> {lastfiveExampleContext[2].title} tito</div>
    } */}
    <Navbar />
      {routes}
    </Router>
    </FilmrecordContext.Provider>
 
  );
}

export default App;
