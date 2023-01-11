import classes from './History.module.css';
import * as React from 'react';
import FilmrecordContext from '../../shared/context/records-context';
import ListCard from './List-card';

const History = () => {
    
    const allrecords = React.useContext(FilmrecordContext)
    const top100 = allrecords.collection.slice(0,100).map(item => 
      <ListCard 
      key={item.id} 
      title={item.title} 
      year={item.yearFilm}
      rating={item.rating}
      /> 
      );

    return(
        <React.Fragment>
        <h2>
            Totes
        </h2>
        <div>
            {top100}
        </div>
        </React.Fragment>
   
    )
}

export default History