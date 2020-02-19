const { Pool } = require('pg');
const Promise = require('bluebird');

const pool = new Pool({
  user: 'bbalbon',
  host: 'localhost',
  database: 'zillow',
  password: '19251925',
  port: 5432,
});

const getHouse = (id) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM houses WHERE id = ${id}`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const insertHouse = (data) => new Promise((resolve, reject) => {
  pool.query(`INSERT INTO houses (z_estimate, estimated_range_min, estimated_range_max, city_name, neighborhood_name, city_prices, neighborhood_prices, property_price) values (${parseInt(data.zEstimate)}, ${parseInt(data.estimatedRangeMin)}, ${parseInt(data.estimatedRangeMax)}, ${data.cityName}, ${data.neighborhoodName}, ${data.cityPrices}, ${data.neighborhoodPrices}, ${data.propertyPrice});`, (err, response) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});

const updateHouse = (data) => new Promise((resolve, reject) => {
  pool.query(`UPDATE houses where id = ${data.id}`, (err, newData) => {
    if (err) {
      reject(err);
    } else {
      resolve(newData);
    }
  });
});

exports.updateHouse = updateHouse;
exports.getHouse = getHouse;
exports.insertHouse = insertHouse;
