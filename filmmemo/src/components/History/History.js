import classes from './History.module.css';
import * as React from 'react';
import FilmrecordContext from '../../shared/context/records-context';
import ListCard from './List-card';
import Pagination from '@mui/material/Pagination'; 


const History = () => {
    
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 10;
    const allrecords = React.useContext(FilmrecordContext)
    // const totalPages = Math.ceil(allrecords.length / itemsPerPage)
    const [totalPages, setTotalPages] = React.useState(0)
    const [directorSelected, setDirectorSelected] = React.useState();
    const [displayedFilms, setDisplayedFilms] = React.useState(allrecords.collection)
    const [directorname, setDirectorname] = React.useState('');

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleDirectorSelected = (directorId, directorName) => {
        setDirectorSelected(directorId);
        setDirectorname(directorName);
    }

    React.useEffect(() =>{
        if (displayedFilms.length === 0){
             (async () => {
                const response = await fetch('http://localhost:5000/api/films/getAll')
                const data = await response.json();
                console.log(data)
                setDisplayedFilms(data)
            })();
        }
        setTotalPages(Math.ceil(displayedFilms.length / itemsPerPage))
    },[displayedFilms.length])

    React.useEffect(() => {
        if(directorSelected){
            const updatedlist = displayedFilms.filter(f => f.directorid === directorSelected)
            const directorlist = updatedlist.sort((a, b) => {
                return a.yearFilm > b.yearFilm ?  -1 : 1
            })
            setPage(1);
            setDisplayedFilms(directorlist)
        };
    },[directorSelected])


    let currentFilms = displayedFilms.slice((page -1)*itemsPerPage, page*itemsPerPage).map(item => 
      <ListCard 
      key={item.id} 
      title={item.title} 
      year={item.yearFilm}
      rating={item.rating}
      poster={item.poster}
      directorname={item.directorname}
      directorid={item.directorid}
      country={item.country} 
      onSelectDirector={handleDirectorSelected}
      /> 
      );

      const reloadAll = () => {
        setDisplayedFilms(allrecords.collection)
        setDirectorname('');
      }

    return(
        <React.Fragment>
        <h2>
            <span onClick={reloadAll}>Totes</span> <span> {directorname}</span>
        </h2>
        <div>
            {currentFilms}
        </div>
        {allrecords.collection.length > 0 && <Pagination
            count={totalPages}
            page={page}
            defaultPage={1}
            showFirstButton
            showLastButton
            onChange={handleChange}
        />}
        </React.Fragment>
   
    )
}

export default History