

const express = require('express');
const bodyParser = require('body-parser');

const data = require('./utils/fakeData');

const app = express();

const filmRoutes = require('./routes/films-routes')
const directorRoutes = require('./routes/director-routes')
const daterecordRoutes = require('./routes/daterecord-routes')
const wishRoutes = require('./routes/wishlist-routes')

// sqlquery('select * from FilmRecord').then((res) => console.log(res.recordsets[0][1298]))

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

  app.use('/api/films', filmRoutes);
  app.use('/api/directors', directorRoutes);
  app.use('/api/days', daterecordRoutes);
  app.use('/api/wishlist', wishRoutes);

//  app.get('/api/films/lastfive', async (req, res, next) =>{
//     const lastFive = await sqlquery(querystrings.last5);
//     res.json(lastFive.recordsets[0]);
// })

app.use((err, req, res, next) => {
  console.error(err.stack); // Log para depuración en el servidor

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Ocurrió un error en el servidor'
  });
});



app.listen(5000);