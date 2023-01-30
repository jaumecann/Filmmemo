const { options } = require('../routes/films-routes');
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
        `SELECT id, title, country
        FROM FilmRecord
        where country = '${target}'
        order by rating desc, country`;
    
        const list = await sqlquery(allYearRecordsQuery)
        idslist = list.recordset.map(a => a.id)
        const index = idslist.findIndex(e => e == idArray[i])
        const biggerSis = idslist[index -1]
        const littleSis = idslist[index+1]

        returnObject[idArray[i]]= {big: biggerSis, little: littleSis}
    }
    
    res.json(returnObject)
    return next();
}


const insert = async (req, res, next) => {

    const timeDetails = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat("en-ca", { year: 'numeric',
    month: '2-digit',
    day: '2-digit'
    })
    const hourFormat = new Intl.DateTimeFormat(undefined, {hour: '2-digit', minute:'numeric'})
    const ratedate = dateTimeFormat.format(timeDetails)
    const ratehour = hourFormat.format(timeDetails)
    console.log(ratedate);
    console.log(ratehour);

    const {title, year, country, director, rate, poster} = req.body
    console.log(req.body)
    const query = `INSERT INTO FilmRecord(title, rating, yearFilm, ratedate, ratehour, country, directorid, poster) VALUES ('${title}', ${rate}, ${year}, '${ratedate}', '${ratehour}', '${country}', ${director}, '${poster}')`
    try {
        const record = await sqlquery(query);
        res.sendStatus(200);
    }
    catch (e) {
        return next(e);
    }
   
}


exports.getLast5 = getLast5;  
exports.getCountries = getCountries;
exports.insert = insert;
exports.getAll = getAll;
exports.getSisters = getSisters