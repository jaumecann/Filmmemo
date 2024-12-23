import React, { useState, useEffect } from 'react'; 
import classes from './CountryFactsModal.module.css';
import { useNavigate } from 'react-router-dom';
import FilmrecordContext from "../../shared/context/records-context";

const FactsModal = ({openModal, country}) => {

    const [countryFacts, setCountryFacts] = useState()
    const [daysDiff, setDaysDiff] = useState();
    const [yearData, setYearData] = useState([]);
    const [listof5Best, setListof5Best] = useState([])
    const currentYear = new Date().getFullYear();
    const getYears = () => {
        const array = []
        for(let y=2004; y <= currentYear; y++){
            array.push(y);
        }
        return array  
    }
    const yearsCollector = getYears();
    const navigate = useNavigate();
    const [isLoaded, setisLoaded] = useState(false);
    const context = React.useContext(FilmrecordContext);

    useEffect(()=>{
        
        (async() => {
            const response = await fetch(`http://localhost:5000/api/films/getCountryFacts/?ctry=${country}`);
            const info = await response.json();
            setCountryFacts(info)
            getSince(info?.last?.ratedate);
            getYearStats(info?.list);
            getBestFilms(info?.list);
            setisLoaded(true);
        })();
    },[country])

    useEffect(()=>{
        
        (() => {
            for(let y=2004; y <= currentYear; y++){
                yearsCollector.push(y);
            }  
        })();
    },[])




    const getSince = (ratedate) => {
        const dataInicial = new Date(ratedate);
        const dataActual = new Date();
        const diff = dataActual - dataInicial;
        const daysGOne = Math.floor(diff / 86400000);
        setDaysDiff(daysGOne)
    }

    const getYearStats = (list) => {
        let yearObject = {};
        list.map(l => {
            const data = new Date(l.ratedate);
            const year = data.getFullYear();
            if(!yearObject[year]){
                yearObject[year] = 1;
            } else {
                yearObject[year] += 1;
            }
        })
        const years = Object.entries(yearObject).map(([clau, valor]) => {
            return { [clau]: valor};
          });

        setYearData(years)
    }

    const setPonderation = (total) => {
        if(total<100){
            return 10;
        } else if (total>100 && total<500){
            return 2
        } else if(total > 500){
            return 1
        }
    }

    const getBestFilms = (list) => {
        const orderedList = list.sort((a,b) => b.rating - a.rating);
        let listOfRandoms = []; 
        let finalList = []
        const targetRating = orderedList[4]?.rating;
        if (orderedList.length > 5 && targetRating === orderedList[5].rating ){
         finalList = orderedList.filter(f => f.rating > targetRating);
         listOfRandoms = orderedList.filter(f => f.rating === targetRating)
         const shuffledArray = [...listOfRandoms].sort(() => Math.random() - 0.5);
         while (finalList.length < 5){
            let item = shuffledArray[0];
            finalList.push(item);
            shuffledArray.shift();
         } 
        }else if(orderedList.length <= 5) {
            finalList = orderedList
         } else {
            finalList = orderedList.slice(0,5)
         }

         setListof5Best(finalList)
        
    }

    const showDirectorFilms = (filmsIDs) => {
        let ids = filmsIDs.split(',');
        let fetchedFilms = [];
        ids.map((id) => { 
          const target = countryFacts.list.find(f => f.id == id)
          if(target){
            fetchedFilms.push(target)
          } else {
            const outsideTarget = context.collection.find(c => c.id == id)
            if(outsideTarget){
                fetchedFilms.push(outsideTarget)
            }
          }
          return id
        })
        if(fetchedFilms.length > 5){
            const [first, second, third, fourth, fifth, ...rest] = fetchedFilms.sort((a,b) => b.rating - a.rating);
            const firstFive = [first, second, third, fourth, fifth];
            setListof5Best(firstFive)
        } else {
            setListof5Best(fetchedFilms)
        }
 
        
    }


    return (<div className={`${classes.modal} ${openModal ? classes.opening : ''} ${!isLoaded ? classes.loader : ''}`}>
        <img alt="flag" src={`/flags/${country.trim()}.png`}></img>
        <div>{countryFacts?.stats?.name}</div>

        <section className={classes.databox}>
            <div className={classes.colddata}>
                <p>Total films: {countryFacts?.stats?.record_count}</p>
                <p>Average: {countryFacts?.stats?.average?.toFixed(2)}</p>
                <p>Frequency: {countryFacts?.stats?.percentage}%</p>
            </div>
        </section>

        <section className={classes.lastseen}>
        <div className={classes.img_last}>
        <img alt="flag" src={`/assets/${countryFacts?.last?.poster}`}></img>
        </div>
        <div className='last_text'>
            Last seen: <span style={{backgroundColor:'#ffa200', padding:'0 3px 0 4px',
    borderRadius: '6px'}}>{countryFacts?.last?.title}</span>
            <p>Fa {daysDiff} dies</p>
        </div>
        </section>

        <section className={classes.bar_area}>
            {country && <div>
                {yearsCollector?.map((item, index) => {
                    let recordForThatYear = yearData.find(y => y[item] !== undefined)
                    if(recordForThatYear === undefined) recordForThatYear = 0;
                    return <div key={index} className={classes.bars}>
                        
                        <div>{item}</div> <div style={{
                        width: `${recordForThatYear[item]? recordForThatYear[item]*setPonderation(countryFacts?.stats?.record_count) : 0}px `,
                        height: '5px',
                        margin: '0 2px',
                        backgroundColor: '#ff6700',
                        alignSelf: 'center'
                    }}></div>
                    <div>{recordForThatYear[item] ?? 0}</div>
                    </div>
                  
                }
                  
                )}
                </div>}         
        </section>

        <section className={classes.fabfive}>
            {listof5Best?.map((item) =>{
                return <div key={item.id} onClick={()=> {navigate(`/film/${item.id}`)}}>
                    <img alt='poster' src={`/assets/${item.poster}`}></img>
                    <div className={classes.rating}>{item.rating}</div>
                    <div className={classes.nameo}>{item.title}</div>
                </div>
            })
            }
        </section>

        <section className={classes.directors}>
            {countryFacts?.directors.map(d => <div key={d.directorid} className={`${classes.directorItem} ${d.avrg >= 5 ? classes.highlight : '' }`} onClick={()=> {showDirectorFilms(d.film_ids)}}>
                {d.directorname}
            </div>)}
        </section>

    </div>)
}


export default FactsModal