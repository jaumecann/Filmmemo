
import classes from './App.module.css';
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
import Home from './components/Home/Home'

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
      <Route exact path="/" element={<Home />}/>
      <Route path="/new_entry" element={<NewEntry />}/>     
      <Route path="/history" element={<History/>}/>
    </Routes>
  );

  React.useEffect(()=>{
    const fetchEverything= async () => {
      const response = await fetch('http://localhost:5000/api/films/getAll')
      let data = await response.json();
      data = data.map((film) => {
        let {country, ...rest} = film;
        country = country.trim();
        return {country, ...rest}
      })
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
