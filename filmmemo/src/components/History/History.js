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
    const [sistersList, setSistersList] = React.useState('');

    const handleChange = (event, value) => {
        setPage(value);
        fetchSisters(value);
    };

    const handleDirectorSelected = (directorId, directorName) => {
        setDirectorSelected(directorId);
        setDirectorname(directorName);
    }

    const getPercentile = (rank, totalFilms) => {
      const over100 = (rank * 100) / totalFilms
      const percentile = 100 - over100;
      return percentile.toFixed(2);
    }

    const fetchSisters = React.useCallback(async(currentPage) => {
        const filmsOnPage = displayedFilms.slice((currentPage -1)*itemsPerPage, currentPage*itemsPerPage);
        const targetIds = filmsOnPage.map(f => f.id)

        const sistersCall = await fetch (`http://localhost:5000/api/films/getSisters/?ids=${targetIds}`)
        const sistersData = await sistersCall.json();
        setSistersList(sistersData)
      

    }, [displayedFilms]
    )

    const handlePageInputChange = (event) => {
        const inputPage = parseInt(event.target.value, 10);
        if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
          setPage(inputPage);
          fetchSisters(inputPage);
        }
      };

    React.useEffect(() =>{
        if (displayedFilms.length === 0){
            return
                // setDisplayedFilms(fetchGlobalContextData)
              }
        setTotalPages(Math.ceil(displayedFilms.length / itemsPerPage));
        fetchSisters(1);
    },[displayedFilms, fetchSisters])

    React.useEffect(() => {
        if(directorSelected){
            const updatedlist = displayedFilms.filter(f => f.directorid === directorSelected)
            const directorlist = updatedlist.sort((a, b) => {
                return a.yearFilm > b.yearFilm ?  -1 : 1
            })
            setPage(1);
            setDisplayedFilms(directorlist)
        };
    },[directorSelected]);

    // const getBigSis = (id) => {
    //     console.log(sistersList[id].bigSis);
    //     return '1'
    //   }


    let currentFilms = displayedFilms.slice((page -1)*itemsPerPage, page*itemsPerPage).map(item => 
      <ListCard 
      key={item.id} 
      title={item.title} 
      year={item.yearFilm}
      rating={item.rating}
      ratingdate={item.ratedate}
      poster={item.poster}
      sisters={sistersList[item.id]}
      directorname={item.directorname}
      directorid={item.directorid}
      country={item.country} 
      countryrank={item.countryRank}
      countrypercent={getPercentile(item.countryRank, item.totalCountry)}
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
            <span onClick={reloadAll}>Totes</span> 
            {directorname && <div className={classes.directorname}> {directorname}</div>}
        </h2>
        <div className={classes.total}>
            Total: {allrecords.collection.length}
        </div>
        <div>
            {currentFilms}
        </div>

        <div className={classes.gotopage}>
        <label htmlFor="pageInput">Go to Page:</label>
        <input
          type="number"
          id="pageInput"
          value={page}
          onChange={handlePageInputChange}
          min={1}
          max={totalPages}
        />
        <span> of {totalPages}</span>
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