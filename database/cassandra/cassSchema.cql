DROP KEYSPACE IF EXISTS zillow;

CREATE KEYSPACE IF NOT EXISTS zillow WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': '3' };

USE zillow;

CREATE TABLE houses (
    id int,
    name text,
    z_estimate int,
    estimated_range_min int,
    estimated_range_max int,
    city_id int, 
    neighborhood_id int, 
    city_name text,
    neighborhood_name text,
    city_prices text,
    neighborhood_prices text,
    house_prices text,
    user int,
    PRIMARY KEY (city_id, neighborhood_id, id)
);

COPY houses(id, name, z_estimate, estimated_range_min, estimated_range_max, city_id, neighborhood_id, city_name, neighborhood_name, city_prices, neighborhood_prices, house_prices, user) FROM '/Users/bbalbon/HackReactor/JD-service/database/cassData.csv' WITH header=true;
