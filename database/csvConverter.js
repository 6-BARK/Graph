const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const faker = require('faker');

const csvWriter = createCsvWriter({
  header: ['name', 'z_estimate', 'estimated_range_min', 'estimated_range_max', 'user_id', 'city_id', 'neighborhood_id', 'prices'],
  path: '/Users/bbalbon/SDC-csv/data.csv',
});

const getRandomNumberInRange = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min)
};

const getVariance = () => {
  return Math.random() < 0.5 ? -(getRandomNumberInRange(1000, 2000)) : getRandomNumberInRange(1000, 2000);
};

const records = [];

for (let i = 0; i < 100000; i++) {
  const z = getRandomNumberInRange(500000, 1000000);
  const offset = getRandomNumberInRange(10000, 20000);
  const city = getRandomNumberInRange(0, 20);
  const neighborhood = getRandomNumberInRange(0, 50);
  const user = getRandomNumberInRange(0, 100);
  let prices = '';
  let start = getRandomNumberInRange(500000, 1000000);
  for (let j = 0; j < 120; j++) {
    const toAdd = start + getVariance();
    prices += `${toAdd}, `;
    start += 3500;
  }
  records.push([faker.address.streetAddress(), z, (z - offset), (z + offset), user, city, neighborhood, prices]);
}

csvWriter.writeRecords(records)
  .then(() => {
    console.log('...Done');
  });
  
