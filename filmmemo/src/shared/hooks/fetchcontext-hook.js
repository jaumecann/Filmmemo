
export const useFetchContext = async() => {

  console.log('calling')
    // const fetchEverything= async () => {
        const response = await fetch('http://localhost:5000/api/films/getAll')
        let data = await response.json();
  
        let datasorted = [...data]
         datasorted = datasorted.sort((a, b) => { 
          if(a.rating > b.rating) return  -1;
          else if (a.rating === b.rating) return 0;
          else return 1;
        });
   
        data = data.map((film) => {
          film.countryRank = undefined;
          film.totalCountry = undefined;
          let {country, countryRank, totalCountry, ...rest} = film;
  
          country = country.trim();
          let countryFilms = datasorted.filter(f => f.country === film.country);
          totalCountry = countryFilms.length
          countryRank = countryFilms.findIndex(f => f.rating === film.rating);
  
          return {country, countryRank, totalCountry, ...rest}
        });
    
    // }

    return data
    
}