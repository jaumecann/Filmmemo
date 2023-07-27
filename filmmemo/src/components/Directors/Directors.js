import React from "react";
import classes from './Directors.module.css';
import { useState } from "react";
import { Pagination } from "@mui/material";

const Directors = () => {

    const [bestDirectors, setBestDirector] = useState([]);
    const [minimum, setMinimum] = useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 10;

    const handleBestDirectorSearch = async () => {
        try{
           const directors = await fetch(`http://localhost:5000/api/directors/best?min=${minimum}`)
           const data = await directors.json();
           setBestDirector(data)
           setPage(1);
           setTotalPages(Math.ceil(bestDirectors.length / itemsPerPage));
        } catch{

        }
    }

    const handleMinimumChange = (event) => {
        let min = event.target.value
        if (Number(min)){
            setMinimum(min)
        } else if (min && !Number(min)) {
            alert('el mínim ha de ser un número, tanoca')
            setMinimum(1)
        } else {
            setMinimum(1)
        }
        
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <React.Fragment>
            <div className={classes.commandrow}>
                <div className={classes.best_avg}>
                Minimun films <input className={classes.best_avg_input} onChange={handleMinimumChange}></input>
                <button  onClick={handleBestDirectorSearch}>Best rating</button>
                </div>     
            </div>
            <div className={classes.list}>
                {bestDirectors.slice((page-1)*itemsPerPage, page*itemsPerPage).map(item => 
                <div key={item.directorid} className={classes.datarow}> 
                <b className={classes.directorname}>{item.directorname}</b><span className={classes.avg}>{item.avrg.toFixed(2)}</span><span className={classes.totals}>{item.totalfilms}</span><span className={classes.country}><img alt='flag' src={`/flags/${item.directorcountry.trim()}.png`}></img></span>
                </div>
                )
                }
            </div>
            <div>
                {bestDirectors && <Pagination
                count={totalPages}
                page={page}
                defaultPage={1}
                showFirstButton
                showLastButton
                onChange={handleChange}
                />}
            </div>
        </React.Fragment>
    )
}

export default Directors