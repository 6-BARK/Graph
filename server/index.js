require('newrelic');
const express = require('express');

const app = express();
const port = 3003;
// const db = require('../database/schema.js');
const controllers = require('./controllers.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Legacy endpoint below
// app.get('/seed', (req, res) => {
//   db.save(() => {
//     db.retrieve((docs) => {
//       res.json(docs);
//     });
//   });
// });

// Added endpoints

app.get('/properties/:id', controllers.get);

app.post('/properties', controllers.post);

app.put('/properties/:id', controllers.updateHouse);

app.put('/prices/:id', controllers.updatePrices);

app.delete('/properties/:id', controllers.remove);

app.listen(port);
