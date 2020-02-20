const { Pool } = require('pg');
const Promise = require('bluebird');

const pool = new Pool({
  user: 'bbalbon',
  host: 'localhost',
  database: 'zillow',
  password: '19251925',
  port: 5432,
});

// select houses.name, cities.city_name, neighborhoods.neighborhood_name, z_estimate, estimated_range_min, estimated_range_max, houses.prices, cities.prices, neighborhoods.prices from houses inner join users on users.id = houses.user_id inner join cities on cities.id = houses.city_id inner join neighborhoods on neighborhoods.id = houses.neighborhood_id where houses.id = 3;
const getHouse = (id) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM houses WHERE id = ${id}`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// insert into houses (name, z_estimate, estimated_range_min, estimated_range_max, user_id, city_id, neighborhood_id, prices) values ('Joey',3,2,5,66,19,19, '1234, 123, 123, 12,3 12,3 12,3 123, 12,3 12,3 1,2 3,12 3,1 23, 12,3 123');
const insertHouse = (data) => new Promise((resolve, reject) => {
  pool.query(`INSERT INTO houses (z_estimate, estimated_range_min, estimated_range_max, city_name, neighborhood_name, city_prices, neighborhood_prices, property_price) values (${parseInt(data.zEstimate)}, ${parseInt(data.estimatedRangeMin)}, ${parseInt(data.estimatedRangeMax)}, ${data.cityName}, ${data.neighborhoodName}, ${data.cityPrices}, ${data.neighborhoodPrices}, ${data.propertyPrice});`, (err, response) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});

// update houses set prices = (prices + '12345') where id = 4513642;
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
