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

-- Query 4: Update GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 6: Update GM Hummer image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';