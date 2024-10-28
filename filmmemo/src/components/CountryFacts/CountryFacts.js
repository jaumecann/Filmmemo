import React, { useState, useEffect } from 'react'; 
import classes from './CountryFacts.module.css';
import FactsModal from './CountryFactsModal';

const CountryFacts = () => {

    const [countryList, setCountryList] = useState([]);
    const [countCountries, setCountCountries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("")

    useEffect(()=>{
        (async() => {
            const response = await fetch('http://localhost:5000/api/films/countries');
            const countries = await response.json();
            setCountryList(countries.filter(c => c.population > 230000));
        })(); 
    },[]);

    useEffect(()=>{( async() => {
        try{
            const totalCountries = await fetch(`http://localhost:5000/api/films/getCountryCount`);
            const records = await totalCountries.json();
            setCountCountries(records)
        } catch(err){
            alert(err)
        }
    })();
    },[])

    const openCard = (id) => {
        if (countCountries.find(c => c.country === id)){
            setIsModalOpen(true);
            setSelectedCountry(id)
        }    
    }

 return (<div>
    <div className={`${isModalOpen ? classes.blockscreen : ''}`} onClick={()=>setIsModalOpen(false)}> </div>
    {countryList && <div className={classes.wrapflags}>
        {countryList.map(ctry => 
            <div key={ctry.countryid} className={classes.cardflag}  style={{
                    backgroundColor: countCountries.find(c => c.country === ctry.countryid) ?'#fcf9e6' : '#ffffff',
                    opacity: countCountries.find(c => c.country === ctry.countryid) ? '1' : '0.5'
                }}
                onClick={()=> openCard(ctry.countryid)}
                >
                <img alt="flag" src={`/flags/${ctry.countryid.trim()}.png`}></img>
                <div>{ctry.name}
                </div>
            </div>
        )}
        </div>}
        <FactsModal openModal={isModalOpen} country={selectedCountry}/>
 </div>)
}

export default CountryFacts