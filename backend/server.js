

const express = require('express');
const bodyParser = require('body-parser');

const data = require('./utils/fakeData');

const app = express();

const sql = require('mssql');

//pool so we donmt open and close conenction every time

let config = {
    user:'sa',
    password:'esoken',
    server:'DESKTOP-I70VC4F',
    database:'Filmmemo',
    trustServerCertificate: true,
    pool: {
        max:10,
        min:0,
    }
};

sql.connect(config, function(err){
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
       
    // query to the database and get the records
    request.query('select * from FilmRecord', function (err, recordset) {
        
        if (err) console.log(err)

        // send records as a response
        console.log(recordset);
   })

})

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
  });
  

app.get('/lastfive', (req, res, next) =>{
    res.json(data);
})


app.listen(5000);