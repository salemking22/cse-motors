-- Create ENUM type
CREATE TYPE account_type AS ENUM ('Client', 'Admin');

-- Create tables
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(100) UNIQUE NOT NULL,
  account_password VARCHAR(100) NOT NULL,
  account_type account_type DEFAULT 'Client'
);

CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE inventory (
  inventory_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  classification_id INTEGER REFERENCES classification(classification_id)
);

-- Insert classification data
INSERT INTO classification (classification_name) VALUES
('Sport'),
('SUV'),
('Truck');

-- Insert inventory data
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id) VALUES
('GM', 'Hummer', 'This vehicle has small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 2),
('Toyota', 'Supra', 'A fast sport car', '/images/supra.jpg', '/images/supra-thumb.jpg', 1);

-- Query 1: Insert Tony Stark
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Query 2: Update Tony Stark to Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Query 3: Delete Tony Stark
DELETE FROM account
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Query 4: Update GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 5: JOIN inventory with classification
SELECT inv_make, inv_model, classification_name
FROM inventory
JOIN classification
ON inventory.classification_id = classification.classification_id;

-- Query 6: Update GM Hummer image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';