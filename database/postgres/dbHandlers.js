const { Pool } = require('pg');
const Promise = require('bluebird');

const pool = new Pool({
  user: 'bbalbon',
  host: 'localhost',
  database: 'zillow',
  port: 5432,
});

const getHouse = (id) => new Promise((resolve, reject) => {
  pool.query(`SELECT houses.house_name, cities.city_name, neighborhoods.neighborhood_name, z_estimate, estimated_range_min, estimated_range_max, houses.house_prices, cities.city_prices, neighborhoods.neighborhood_prices from houses inner join cities on cities.id = houses.city_id inner join neighborhoods on neighborhoods.id = houses.neighborhood_id where houses.id = ${id}`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data.rows);
    }
  });
});

const insertHouse = (data) => new Promise((resolve, reject) => {
  const {
    name,
    z,
    estimatedRangeMin,
    estimatedRangeMax,
    userId,
    cityId,
    neighborhoodId,
    prices,
  } = data;
  pool.query(`INSERT INTO houses (house_name, z_estimate, estimated_range_min, estimated_range_max, user_id, city_id, neighborhood_id, house_prices) values ('${name}', ${parseInt(z, 10)}, ${parseInt(estimatedRangeMin, 10)}, ${parseInt(estimatedRangeMax, 10)}, ${parseInt(userId, 10)}, ${parseInt(cityId, 10)}, ${parseInt(neighborhoodId, 10)}, '${prices}');`, (err, response) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});

const updateHouse = (data, id) => new Promise((resolve, reject) => {
  pool.query(`UPDATE houses set house_name = '${data.name}' where id = ${id}`, (err, newData) => {
    if (err) {
      reject(err);
    } else {
      resolve(newData.rows);
    }
  });
});

const updatePrices = (data, id) => new Promise((resolve, reject) => {
  pool.query(`UPDATE houses set house_prices = house_prices || '${data.price}' where id = ${id}`, (err, newData) => {
    if (err) {
      reject(err);
    } else {
      resolve(newData.rows);
    }
  });
});

const deleteHouse = (id) => new Promise((resolve, reject) => {
  pool.query(`DELETE from houses where id = ${id};`, (err, newData) => {
    if (err) {
      reject(err);
    } else {
      resolve(newData);
    }
  });
});

module.exports = {
  deleteHouse,
  updateHouse,
  updatePrices,
  getHouse,
  insertHouse,
};
