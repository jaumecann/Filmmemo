import classes from './History.module.css';
import * as React from 'react';
import FilmrecordContext from '../../shared/context/records-context';
import ListCard from './List-card';
import Pagination from '@mui/material/Pagination'; 
import { useFetchContext } from '../../shared/hooks/fetchcontext-hook';
import { useParams } from 'react-router-dom';


const History = () => {
    
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 10;
    const allrecords = React.useContext(FilmrecordContext)
    // const totalPages = Math.ceil(allrecords.length / itemsPerPage)
    const [totalPages, setTotalPages] = React.useState(0)
    const [directorSelected, setDirectorSelected] = React.useState();
    const [displayedFilms, setDisplayedFilms] = React.useState(allrecords.collection)
    const [directorname, setDirectorname] = React.useState('');
    const fetchGlobalContextData = useFetchContext();
    const [sistersList, setSistersList] = React.useState('');

    const handleChange = (event, value) => {
        setPage(value);
        fetchSisters();
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

    const fetchSisters = React.useCallback(async() => {
        const filmsOnPage = displayedFilms.slice((page -1)*itemsPerPage, page*itemsPerPage);
        const targetIds = filmsOnPage.map(f => f.id)

        const sistersCall = await fetch (`http://localhost:5000/api/films/getSisters/?ids=${targetIds}`)
        const sistersData = await sistersCall.json();
        console.log(sistersData)
        setSistersList(sistersData)
      

    }, [displayedFilms, page]
    )

    React.useEffect(() =>{
        if (displayedFilms.length === 0){
            fetchGlobalContextData.then(r => {
                setDisplayedFilms(r)
              })
        }
        setTotalPages(Math.ceil(displayedFilms.length / itemsPerPage));
        fetchSisters();
    },[])

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