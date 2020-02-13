const express = require('express');

const app = express();
const port = 3003;
const db = require('../database/schema.js');
const handlers = require('../database/dbHandlers.js');

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

app.put('/properties', (req, res) => {
  const { options } = req.params;
  const { id } = req.params;
  db.update(id, options)
    .then((docs) => {
      res.send(docs);
    });
});

app.delete('/properties', (req, res) => {
  const { id } = req.params;
  db.deleteOne(id)
    .then((updatedProp) => {
      res.send(updatedProp);
    });
});

app.listen(port);
