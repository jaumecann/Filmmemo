
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


const insert = async (req, res, next) => {

    const [ratedate, ratehour] = timeFieldsForNow();

    const {title, year, country, director, rate, poster} = req.body
    const query = `INSERT INTO FilmRecord(title, rating, yearFilm, ratedate, ratehour, country, directorid, poster) VALUES ('${title}', ${rate}, ${year}, '${ratedate}', '${ratehour}', '${country}', ${director}, '${poster}')`
    try {
        const record = await sqlquery(query);
        res.sendStatus(200);
    }
    catch (e) {
        return next(e);
    }
   
}

const update = async (req, res, next) => {

const {id, title, year, country, director, rate, poster} = req.body
const enteredRating = parseInt(rate)

/* primer comprovem si ha canviat la nota */
const idquerystring = `${querystrings.getFilm}${id}`
const previousRecord = await sqlquery(idquerystring);
const previousRating = previousRecord.recordset[0].rating;

let query;

if (enteredRating !== previousRating){
    const [date, hour] = timeFieldsForNow();
 
    query = `UPDATE Filmrecord SET title = '${title}', rating = '${rate}', yearFilm = '${year}', ratedate = '${date}', ratehour = '${hour}', country = '${country}', directorid = '${director}', poster = '${poster}' WHERE id = ${id}`

    //WIP update registres de Dayrecord
    // const ratingDiff = enteredRating - previousRating

    // try {
    //     updateDateRecord = `UPDATE Dayrecord SET totalpoints = totalpoints + ${ratingDiff} where id = `
    //     await sqlquery
    // }
    // catch (e){
    //     return next(e);    
    // }
} else {
    query = `UPDATE Filmrecord SET title = '${title}', yearFilm = '${year}', country = '${country}', directorid = '${director}', poster = '${poster}' WHERE id = ${id}`
};

/* TO DO - log amb canvi nota que hi hagi hagut (taula on un camp sigui explicació de l'update) */
try {
    const record = await sqlquery(query);
    res.sendStatus(200);
}
catch (e) {
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



exports.getLast5 = getLast5;  
exports.getCountries = getCountries;
exports.insert = insert;
exports.getAll = getAll;
exports.getSisters = getSisters;
exports.getFilm = getFilm;
exports.update = update;