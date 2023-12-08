
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
import { useFetchContext } from './shared/hooks/fetchcontext-hook';
import FilmDetail from './components/FilmDetail/FilmDetail';
import Tops from './components/Tops/Tops';
import Directors from './components/Directors/Directors';
import Stats from './components/Stats/Stats'

function App() {

  let routes;

  const {dataGlobal, fetchData} = useFetchContext();
  const [contextData, setContextData] = React.useState([]);

  routes = (
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route path="/new_entry" element={<NewEntry key="add-film" />}/>     
      <Route path="/edit/:id" element={<NewEntry key="update-film"/>} />
      <Route path="/history" element={<History/>}/>
      <Route path="/tops" element={<Tops/>}/>
      <Route path="/film/:id" element={<FilmDetail/>}/>
      <Route path="/Directors" element={<Directors/>}/>
      <Route path="/stats" element={<Stats/>}/>
      
    </Routes>
  );

  React.useEffect(()=>{
      setContextData(dataGlobal)
  },[dataGlobal])

  const onUpdate = async () => {
    try {
      const data = await fetchData(); // Re-fetch data
      setContextData(data); // Update context data with fetched data
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <FilmrecordContext.Provider
      value={{collection: contextData, update: onUpdate}}
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
