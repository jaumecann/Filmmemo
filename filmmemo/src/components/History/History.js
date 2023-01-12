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

    const handleChange = (event, value) => {
        setPage(value);
    };

    React.useEffect(() =>{
        setTotalPages(Math.ceil(allrecords.collection.length / itemsPerPage))
    },[allrecords.collection.length])

    const currentFilms = allrecords.collection.slice((page -1)*itemsPerPage, page*itemsPerPage).map(item => 
      <ListCard 
      key={item.id} 
      title={item.title} 
      year={item.yearFilm}
      rating={item.rating}
      poster={item.poster}
      /> 
      );

    return(
        <React.Fragment>
        <h2>
            Totes
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