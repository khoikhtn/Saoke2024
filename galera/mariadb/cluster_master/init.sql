CREATE DATABASE IF NOT EXISTS test;

USE test;

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
	date DATE,
	code VARCHAR(50),
	amount BIGINT,
	details TEXT
);

LOAD DATA LOCAL INFILE '/saoke.csv'
INTO TABLE transactions
FIELDS TERMINATED BY ','
ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
