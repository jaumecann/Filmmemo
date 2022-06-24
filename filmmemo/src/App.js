
import classes from './App.module.css';
import { LastFive } from './components/LastFive/LastFive';

function App() {
  return (
    <div>
      <header className={classes.header}>
        Film<span className={classes.yellow}>History</span>
      </header>
      <LastFive />
    </div>
  );
}

export default App;
