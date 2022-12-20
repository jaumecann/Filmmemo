const sql = require('mssql');

//pool so we donmt open and close conenction every time

let config = {
    user:'sa',
    password:'esoken',
    server:'DESKTOP-I70VC4F',
    database:'Filmmemo',
    pool: {
        max:10,
        min:0,
    }
};

const connection = sql.connect(config);
// let connection = sql.connect(config, function(err){
//     if (err) console.log(err);

//     // create Request object
//     let request = new sql.Request();
       
//     // query to the database and get the records
//     request.query('select * from FilmRecord', function (err, recordset) {
        
//         if (err) console.log(err)

//         // send records as a response
//         res.send(recordset);
//    })

// })

module.exports = connection;