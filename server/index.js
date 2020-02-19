const express = require('express');

const app = express();
const port = 3003;
const db = require('../database/schema.js');
const handlers = require('../database/postgres/dbHandlers.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/seed', (req, res) => {
  db.save(() => {
    db.retrieve((docs) => {
      res.json(docs);
    });
  });
});

app.get('/properties', (req, res) => {
  handlers.getHouses()
    .then((properties) => {
      res.send(properties);
    });
});

app.get('/properties/:id', (req, res) => {
  const { id } = req.params;
  handlers.getHouse(id)
    .then((property) => {
      res.send(property);
    });
});

app.post('/properties', (req, res) => {
  handlers.insertHouse(req.body)
    .then((response) => {
      res.send(response);
    });
});

app.put('/properties/:id', (req, res) => {
  const options = req.body;
  const { id } = req.params;
  db.update(id, options)
    .then((docs) => {
      res.send(docs);
    });
});

app.delete('/properties/:id', (req, res) => {
  const { id } = req.params;
  db.deleteOne(id)
    .then((updatedProp) => {
      res.send(updatedProp);
    });
});

app.listen(port);

// const houseModel = {
//   id: 1,
//   name: '123 fakeAddress Way',
//   zEstimate: 4,
//   estimatedRangeMin: 1,
//   estimatedRangeMax: 2,
//   user_id: 3, // choose from eligible users
//   city_id: 4, // choose from eligible cities
//   neighborhood_id: 6, // choose from eligible neighborhoods
//   prices: '12000, 12000, 12000, 12000, 12000', // string to be interpreted by client
// };

// const citiesModel = {
//   id: 1,
//   name: 'fakeCityName',
//   prices: '12000, 12000, 12000, 12000, 12000',
// };

// const neighborhoodModel = {
//   id: 1,
//   name: 'fakeNeighborhoodName',
//   prices: '12000, 12000, 12000, 12000, 12000',
// };

// const users = {
//   id: 1,
//   name: 'fakeName',
// };
