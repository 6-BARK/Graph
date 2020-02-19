const pg = require('../database/postgres/dbHandlers.js');

const get = {
  pg: (req, res) => {
    const { id } = req.params;
    pg.getHouse(id)
      .then((property) => {
        res.send(property);
      });
  },
};

const post = {
  pg: (req, res) => {
    pg.insertHouse(req.body)
      .then((response) => {
        res.send(response);
      });
  },
};

const update = {
  pg: (req, res) => {
    pg.updateHouse(req.body)
      .then((response) => {
        res.send(response);
      });
  },
};

module.exports = {
  get,
  post,
  update,
};
