const { Pool } = require('pg');
const faker = require('faker');
const path = require('path');
const csv = require('./csvConverter.js');

const pool = new Pool({
  user: 'bbalbon',
  host: 'localhost',
  database: 'zillow',
  port: 5432,
});

const filePath = path.join(__dirname, 'data.csv');

const getRandomNumberInRange = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min);
};

const getVariance = () => {
  return Math.random() < 0.5 ? -(getRandomNumberInRange(1000, 2000)) : getRandomNumberInRange(1000, 2000);
};

const insertCSV = () => {
  pool.query(`COPY houses(name, z_estimate, estimated_range_min, estimated_range_max, user_id, city_id, neighborhood_id, prices) FROM '${filePath}' DELIMITER ',' CSV HEADER;`, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log('done');
    }
  });
};

// 100 users, 20 cities, 50 neighborhoods

// users seed
for (let i = 1; i < 100; i++) {
  const name = faker.name.firstName();
  pool.query(`INSERT INTO users (name) values ('${name}')`);
}

// cities seed
for (let i = 1; i <= 20; i++) {
  let prices = '';
  let start = getRandomNumberInRange(500000, 1000000);
  for (let j = 0; j < 120; j++) {
    const toAdd = start + getVariance();
    prices += `${toAdd}, `;
    start += 3500;
  }
  const city = faker.address.city();
  pool.query(`INSERT INTO cities (city_name, prices) values ('${city}', '${prices}}')`);
}

// neighborhoods seed
for (let i = 1; i <= 50; i++) {
  let prices = '';
  let start = getRandomNumberInRange(500000, 1000000);
  for (let j = 0; j < 120; j++) {
    const toAdd = start + getVariance();
    prices += `${toAdd}, `;
    start += 3500;
  }
  const neighborhood = faker.address.streetName();
  pool.query(`INSERT INTO neighborhoods (neighborhood_name, prices) values ('${neighborhood}', '${prices}}')`);
}

// houses seed
csv.writeCSV()
  .then((result) => {
    insertCSV();
  });
