DROP KEYSPACE IF EXISTS zillow;

CREATE KEYSPACE IF NOT EXISTS zillow WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': '1' };

USE zillow;

CREATE TABLE houses (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    name varchar (30) NOT NULL,
    z_estimate integer NOT NULL,
    estimated_range_min integer NOT NULL,
    estimated_range_max integer NOT NULL,
    city_id integer references cities(id),
    neighborhood_id integer references neighborhoods(id),
);

CREATE TABLE cities (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    city_name varchar (30) NOT NULL
)

CREATE TABLE neighborhoods (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    neighborhood_name varchar (30) NOT NULL
)

CREATE TABLE houses_data (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    house integer references houses(id),
    date_mts integer,
    price integer
)

CREATE TABLE cities_data (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    city integer references cities(id),
    date_mts integer,
    price integer
)

CREATE TABLE neighborhoods_data (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    neighborhood integer references neighborhoods(id),
    date_mts integer,
    price integer
)