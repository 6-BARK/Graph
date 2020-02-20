const pg = require('../database/postgres/dbHandlers.js');

const get = (req, res) => {
  pg.getHouse(req.params.id)
    .then((property) => {
      res.send(property);
      res.status(200);
    });
};

const post = (req, res) => {
  pg.insertHouse(req.body)
    .then((results) => {
      res.status(200);
      res.send(results);
    });
};

const updateHouse = (req, res) => {
  pg.updateHouse(req.body, req.params.id)
    .then((response) => {
      res.status(200);
      res.send(response);
    });
};

const updatePrices = (req, res) => {
  pg.updatePrices(req.body, req.params.id)
    .then((response) => {
      res.status(200);
      res.send(response);
    });
};

const remove = (req, res) => {
  pg.deleteHouse(req.params.id)
    .then((response) => {
      res.status(200);
      res.send(response);
    });
};

module.exports = {
  get,
  post,
  updateHouse,
  updatePrices,
  remove,
};
