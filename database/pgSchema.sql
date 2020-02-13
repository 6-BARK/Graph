CREATE DATABASE ZILLOW;

USE ZILLOW;

CREATE TABLE houses (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    z_estimate integer NOT NULL,
    estimated_range_min integer NOT NULL,
    estimated_range_max integer NOT NULL,
    city_name varchar (30) NOT NULL,
    neighborhood_name varchar (30) NOT NULL,
    city_prices integer ARRAY[120],
    neighborhood_prices integer ARRAY[120],
    property_price integer ARRAY[120]
);

