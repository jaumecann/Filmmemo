
const sqlquery = require('../utils/database')
const querystrings = require('../utils/sql-dark-corner');

const getLast5 = async (req, res, next) =>{
    const lastFive = await sqlquery(querystrings.last5);
    res.json(lastFive.recordsets[0])
    return next();
    }

const getAll = async (req,res,next) => {
    const allFilms = await sqlquery(querystrings.getAll)
    res.json(allFilms.recordset)
    return next();
}

const getAllWithNotSeen = async (req,res,next) => {
    const allFilms = await sqlquery(querystrings.getAllWithNotSeen)
    res.json(allFilms.recordset)
    return next();
}

const getFilm = async (req, res, next) => {
    const idquerystring = `${querystrings.getFilm}${req.query.id}`
    const film = await sqlquery(idquerystring);
    res.json(film.recordset)
    return next();
}

const getCountries = async (req,res, next) => {
    const countries = await sqlquery(querystrings.countries)
    res.json(countries.recordsets[0])
    return next();
}

const getSisters = async (req,res, next) => {
    const ids = req.query.ids
    const idArray = ids.split(',')

    returnObject = {}

    for (let i=0; i < idArray.length; i++){
        const queryCountry = `SELECT country FROM FilmRecord where id = ${idArray[i]}`
        const country = await sqlquery(queryCountry)
        const target = country.recordset[0].country
    
        const allYearRecordsQuery = 
        `SELECT id, title, country, poster
        FROM FilmRecord
        where country = '${target}'
        order by rating desc, country`;
    
        const list = await sqlquery(allYearRecordsQuery)
        idslist = list.recordset.map(a => {return {id:a.id, poster:a.poster}})
        const index = idslist.findIndex(e => e.id == idArray[i])
        const biggerSis = idslist[index -1]
        const littleSis = idslist[index+1]

      

        returnObject[idArray[i]]= {bigSis: biggerSis?.poster ? biggerSis.poster : '', 
                                littleSis: littleSis?.poster ? littleSis.poster : ''
                            }
    }
    
    res.json(returnObject)
    return next();
}

const getTop = async (req, res, next) => {

    let country = req.query.country;
    let director = req.query.director;
    let year = req.query.year;

    let querytop;
    if(country !== 'null'){
        querytop = `SELECT * FROM FilmRecord where country = '${country}' order by rating desc`
    } else if(director !== 'null'){
        querytop = `SELECT * FROM FilmRecord where directorid = '${director}' order by rating desc`
    } else if(year !== null){
        querytop = `SELECT * FROM FilmRecord where yearFilm = '${year}' order by rating desc`
    }

    console.log(querytop)
 
    const response = await sqlquery(querytop)

    res.json(response.recordsets[0])
    return next();
}


const insert = async (req, res, next) => {

    let [ratedate, ratehour] = timeFieldsForNow();
    const {title, year, country, director, rate, poster} = req.body
    let query = '';
    let updateDayRecord = '';
    console.log(rate)

    if(rate === null){
        ratedate = null; ratehour=null
        query = `INSERT INTO FilmRecord(title, rating, yearFilm, ratedate, ratehour, country, directorid, poster) VALUES ('${title}', ${rate}, ${year}, ${ratedate}, ${ratehour}, '${country}', ${director}, '${poster}')`;
    } else {
        query = `INSERT INTO FilmRecord(title, rating, yearFilm, ratedate, ratehour, country, directorid, poster) VALUES ('${title}', ${rate}, ${year}, '${ratedate}', '${ratehour}', '${country}', ${director}, '${poster}')`;
        const [yearrate, month, day] = ratedate.split('-');
        const id = `${day}${month}`;
    
        updateDayRecord = `UPDATE Dayrecord SET totalpoints = totalpoints + ${rate}, film_number = film_number + 1 where id = ${id}`;
    }

    
    try {
        const record = await sqlquery(query);
        await sqlquery(updateDayRecord)
        res.sendStatus(200);
    }
    catch (e) {
        return next(e);
    }
   
}

const update = async (req, res, next) => {

const {id, title, year, country, director, rate, poster} = req.body

const enteredRating = rate ? parseInt(rate): null;

/* primer comprovem si ha canviat la nota */
const idquerystring = `${querystrings.getFilm}${id}`
const previousRecord = await sqlquery(idquerystring);
const previousRating = previousRecord.recordset[0].rating;

let query;
let updateDateRecord = '';

if(rate === null){
    query = `UPDATE Filmrecord SET title = '${title}', rating = ${rate}, yearFilm = '${year}', country = '${country}', directorid = '${director}', poster = '${poster}' WHERE id = ${id}`
}

else if (enteredRating !== previousRating){
    const [date, hour] = timeFieldsForNow();
 
    query = `UPDATE Filmrecord SET title = '${title}', rating = '${rate}', yearFilm = '${year}', ratedate = '${date}', ratehour = '${hour}', country = '${country}', directorid = '${director}', poster = '${poster}' WHERE id = ${id}`

    //WIP update registres de Dayrecord
    const ratingDiff = enteredRating - previousRating
    const [yearrate, month, day] = date.split('-');
    const idDate = `${day}${month}`;

    updateDateRecord = `UPDATE DayRecord SET totalpoints = totalpoints + ${ratingDiff} where id = ${idDate}`
    console.log(updateDateRecord)
   
} else {
    query = `UPDATE Filmrecord SET title = '${title}', yearFilm = '${year}', country = '${country}', directorid = '${director}', poster = '${poster}' WHERE id = ${id}`
};

/* TO DO - log amb canvi nota que hi hagi hagut (taula on un camp sigui explicació de l'update) */
try {
    console.log(query)
    const record = await sqlquery(query);
    if(updateDateRecord.length > 0){
        await sqlquery(updateDateRecord)
    }
    res.sendStatus(200);
}
catch (e) {
    console.log('errorficio')
    return next(e);
}
}

const timeFieldsForNow = () => {
    const timeDetails = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat("en-ca", { year: 'numeric',
    month: '2-digit',
    day: '2-digit'
    })
    const hourFormat = new Intl.DateTimeFormat(undefined, {hour: '2-digit', minute:'numeric'})
    const ratedate = dateTimeFormat.format(timeDetails)
    const ratehour = hourFormat.format(timeDetails)

    return [ratedate, ratehour]
}
 
const countryCount = async (req,resp,next) => {
    const countCountries = await sqlquery(querystrings.getTotalsCountry)
    resp.json(countCountries.recordset)
    return next();
}

const getCountryFacts = async (req, resp, next) => {
    const allFilms = await sqlquery(querystrings.getAll)
    const countCountries = await sqlquery(querystrings.getTotalsCountry)
    const countryFilms = allFilms.recordset.filter(f => f.country.trim() === req.query.ctry)
    const countryCount = countCountries.recordset.filter(c => c.country.trim() === req.query.ctry)
    const mostRecent = countryFilms.sort((a,b) => a.ratedate > b.ratedate)[0];
    let directorQuery = `SELECT directorname, directorid, directorcountry, AVG(CAST(rating AS DECIMAL(4, 2))) AS avrg, COUNT(*) as totalfilms, STRING_AGG(f.id, ',') AS film_ids FROM [Filmmemo].[dbo].[FilmRecord] f
    JOIN Directors d ON f.directorid = d.id
    WHERE d.directorcountry = '${req.query.ctry}' and rating is not null
    GROUP BY directorid, directorname, directorcountry
    HAVING COUNT(*) >= 1
    ORDER BY avrg DESC`
    const directors = await sqlquery(directorQuery)
    const returnObject = {
        list: countryFilms,
        stats: countryCount[0],
        last: mostRecent,
        directors: directors.recordset
    }
    resp.json(returnObject)
    return next();
} 


exports.getLast5 = getLast5;  
exports.getCountries = getCountries;
exports.insert = insert;
exports.getAll = getAll;
exports.getSisters = getSisters;
exports.getFilm = getFilm;
exports.update = update;
exports.getTop = getTop;
exports.getCountryCount = countryCount;
exports.getAllWithNotSeen = getAllWithNotSeen
exports.getCountryFacts = getCountryFacts