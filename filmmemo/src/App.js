
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

function App() {

  let routes;

  const fetchData = useFetchContext();
  const [contextData, setContextData] = React.useState([]);

  routes = (
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route path="/new_entry" element={<NewEntry key="add-film" />}/>     
      <Route path="/edit/:id" element={<NewEntry key="update-film"/>} />
      <Route path="/history" element={<History/>}/>
      <Route path="/film/:id" element={<FilmDetail/>}/>
    </Routes>
  );

  React.useEffect(()=>{
      setContextData(fetchData)
  },[fetchData])


  return (
    <FilmrecordContext.Provider
      value={{collection: contextData}}
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
