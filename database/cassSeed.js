const cassandra = require('cassandra-driver');
const path = require('path');
const csv = require('./csvConverter.js');

const client = new cassandra.Client({
  localDataCenter: 'datacenter1',
  contactPoints: ['127.0.0.1:9042'],
  keyspace: 'zillow',
});

const filePath = path.join(__dirname, 'cassData.csv');

csv.writeCassCSV();
