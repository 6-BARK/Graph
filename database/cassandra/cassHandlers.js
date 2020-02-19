const cassandra = require('cassandra-driver');
const Promise = require('bluebird');

const client = new cassandra.Client({
  localDataCenter: 'datacenter1',
  contactPoints: ['127.0.0.1:9042'],
  keyspace: 'zillow',
});

const getHouse = (options) => new Promise((resolve, reject) => {
  const {
    cityId,
    neighborhoodId,
  } = options;
  client.execute(`Select * from houses where city_id = ${cityId} and neighborhood_id = ${neighborhoodId} and id = 6257865;`)
    .then((response) => {
      resolve(response);
    });
});

const insertHouse = (options) => new Promise((resolve, reject) => {
  const {
    id,
    name,
    z,
    rangeMin,
    rangeMax,
    cityId,
    neighborhoodId,
    cityName, 
    cityPrices,
    neighborhoodPrices,
    housePrices,
    user,
  } = options;
  client.execute(`INSERT INTO houses (id,name,z_estimate,estimated_range_min,estimated_range_max,city_id,neighborhood_id,city_name,neighborhood_name,city_prices,neighborhood_prices,house_prices,user) values (${id},${name},${z},${rangeMin},${rangeMax},${cityId},${neighborhoodId},${cityName},${cityPrices},${neighborhoodPrices},${housePrices},${user});`)
    .then((response) => {
      resolve(response);
    })
});

const deleteHouse = (options) => new Promise((resolve, reject) => {
  const {
    cityId,
    neighborhoodId,
  } = options;
  client.execute(`DELETE FROM houses where city_id=${cityId} and neighborhood_id=${neighborhoodId} and id=6257865`)
    .then((response) => {
      resolve(response);
    });
});

module.exports.insertHouse = insertHouse;
module.exports.getHouse = getHouse;
module.exports.deleteHouse = deleteHouse;
