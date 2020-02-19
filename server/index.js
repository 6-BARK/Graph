const express = require('express');

const app = express();
const port = 3003;
const db = require('../database/schema.js');
const controllers = require('./controllers.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Legacy endpoint below
app.get('/seed', (req, res) => {
  db.save(() => {
    db.retrieve((docs) => {
      res.json(docs);
    });
  });
});

// Added endpoints

app.get('/properties/:id', controllers.get.pg);

app.post('/properties', controllers.post.pg);

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
