DROP DATABASE ZILLOW;

CREATE DATABASE ZILLOW;

\connect zillow;

CREATE TABLE cities (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    city_name varchar (60) NOT NULL,
    city_prices varchar (1500) NOT NULL
);

CREATE TABLE neighborhoods (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    neighborhood_name varchar (60) NOT NULL,
    neighborhood_prices varchar (1500) NOT NULL
);

CREATE TABLE users (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    name varchar (50) NOT NULL
);

CREATE TABLE houses (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    house_name varchar (60) NOT NULL,
    z_estimate integer NOT NULL,
    estimated_range_min integer NOT NULL,
    estimated_range_max integer NOT NULL,
    user_id integer references users(id) NOT NULL,
    city_id integer references cities(id) NOT NULL,
    neighborhood_id integer references neighborhoods(id) NOT NULL,
    house_prices varchar (1500) NOT NULL
);