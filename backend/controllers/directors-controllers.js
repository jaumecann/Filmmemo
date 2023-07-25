const sqlquery = require('../utils/database')
const querystrings = require('../utils/sql-dark-corner');

const getDirectors = async (req, res, next) =>{
    const alldirectors = await sqlquery(querystrings.alldirectors);
    res.json(alldirectors.recordsets[0])
    return next();
    }
    
const insert = async (req, res, next) => {
    
    const {name, country} = req.body

    const query = `INSERT INTO Directors(directorname, directorcountry) VALUES ('${name}', '${country}')`
    try {
        await sqlquery(query);
        res.sendStatus(200);
    }
    catch(e){
        return next(e);
    }
}

const getBest = async (req, res, next) => {
    const minimum = req.query.min;
    const query = `SELECT directorname, directorid, AVG(CAST(rating AS DECIMAL(4, 2))) AS avrg, COUNT(*) as totalfilms, STRING_AGG(f.id, ',') AS film_ids
    FROM [Filmmemo].[dbo].[FilmRecord] f
    JOIN Directors d ON f.directorid = d.id
    GROUP BY directorid, directorname
    HAVING COUNT(*) >= ${minimum}
    ORDER BY avrg DESC`

    try{
        const rankDirectors = await sqlquery(query);
        res.json(rankDirectors.recordsets[0])
        return next();
    }catch(e){
        return next(e)
    }
}


exports.getDirectors = getDirectors;  
exports.insert = insert;
exports.getBest = getBest;
