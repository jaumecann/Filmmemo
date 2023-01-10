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