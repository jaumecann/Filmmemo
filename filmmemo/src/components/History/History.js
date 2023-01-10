import classes from './History.module.css';
import * as React from 'react';
import FilmrecordContext from '../../shared/context/records-context';

const History = () => {
    
    const allrecords = React.useContext(FilmrecordContext)
    const top100 = allrecords.collection.slice(0,100).map(item => <li key={item.id}>{item.title}</li> );

    return(
        <React.Fragment>
        <h2>
            Totes
        </h2>
        <ul>
            {top100}
        </ul>
        </React.Fragment>
   
    )
}

export default History