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


exports.getDirectors = getDirectors;  
exports.insert = insert
