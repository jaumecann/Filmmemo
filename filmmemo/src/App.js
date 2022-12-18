
import classes from './App.module.css';
import { LastFive } from './components/LastFive/LastFive';
import NewEntry from './components/NewEntry/NewEntry';

function App() {
  return (
    <div>
      <header className={classes.header}>
        Film<span className={classes.yellow}>History</span>
      </header>
      <LastFive />
      <NewEntry />
    </div>
  );
}

export default App;
