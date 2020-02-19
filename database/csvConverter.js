const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const faker = require('faker');

const filePath = path.join(__dirname, 'data.csv');
const cassFile = path.join(__dirname, 'cassData.csv');
const writeHouses = fs.createWriteStream(`${filePath}`);
const writeCassHouses = fs.createWriteStream(`${cassFile}`);

const addresses = ['123 the way', '456 the hat', '789 the cat'];

const getRandomNumberInRange = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min);
};

const getVariance = () => {
  return Math.random() < 0.5 ? -(getRandomNumberInRange(1000, 2000)) : getRandomNumberInRange(1000, 2000);
};


const createCSV = (writer, encoding, callback) => {
  writeHouses.write('name,z_estimate,estimated_range_min,estimated_range_max,user_id,city_id,neighborhood_id,prices\n', 'utf-8');
  let i = 10000000;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const z = getRandomNumberInRange(500000, 1000000);
      const offset = getRandomNumberInRange(10000, 20000);
      const city = getRandomNumberInRange(1, 20);
      const neighborhood = getRandomNumberInRange(1, 50);
      const user = getRandomNumberInRange(1, 100);
      let prices = '';
      let start = getRandomNumberInRange(500000, 1000000);
      for (let j = 0; j < 120; j++) {
        const toAdd = start + getVariance();
        prices += `${toAdd} `;
        start += 3500;
      }
      const data = `'${addresses[Math.round(Math.random() * 2)]}',${z},${z - offset},${z + offset},${user},${city},${neighborhood},'${prices}'\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

const writeCSV = () => new Promise((resolve, reject) => {
  createCSV(writeHouses, 'utf-8', () => {
    writeHouses.end();
    resolve('done');
  });
});

const cassCSV = (writer, encoding, callback) => {
  writeCassHouses.write('id,name,z_estimate,estimated_range_min,estimated_range_max,city_id,neighborhood_id,city_name,neighborhood_name,city_prices,neighborhood_prices,house_prices,user\n', 'utf-8');
  let i = 10000000;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const id = i;
      const z = getRandomNumberInRange(500000, 1000000);
      const offset = getRandomNumberInRange(10000, 20000);
      const city = getRandomNumberInRange(1, 20);
      const neighborhood = getRandomNumberInRange(1, 50);
      const user = getRandomNumberInRange(1, 100);
      let prices = '';
      let start = getRandomNumberInRange(500000, 1000000);
      for (let j = 0; j < 10; j++) {
        const toAdd = start + getVariance();
        prices += `${toAdd} `;
        start += 3500;
      }
      const data = `${id},'${addresses[Math.round(Math.random() * 2)]}',${z},${z - offset},${z + offset},${city},${neighborhood},'${faker.name.firstName()}','${faker.name.firstName()}','${prices}','${prices}','${prices}',${user}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

const writeCassCSV = () => new Promise((resolve, reject) => {
  cassCSV(writeCassHouses, 'utf-8', () => {
    writeCassHouses.end();
    resolve('done');
  });
});

module.exports.writeCassCSV = writeCassCSV;
module.exports.writeCSV = writeCSV;
