import React from 'react';

const FilmrecordContext = React.createContext({
    collection: [],
    days_collection: [],
    update:()=>[],
    updateDays:()=>[]
});


export default FilmrecordContext;