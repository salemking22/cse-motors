CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    account_type VARCHAR(20) DEFAULT 'User'
);

CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_description VARCHAR(255),
    classification_id INT REFERENCES classification(classification_id),
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255)
);

INSERT INTO classification (classification_name) VALUES
('Sport'),
('SUV');

INSERT INTO inventory (inv_make, inv_model, inv_description, classification_id, inv_image, inv_thumbnail) VALUES
('GM', 'Hummer', 'small interiors', 2, '/images/hummer.jpg', '/images/hummer_thumb.jpg'),
('Ferrari', '488', 'fast sports car', 1, '/images/ferrari.jpg', '/images/ferrari_thumb.jpg'),
('Porsche', '911', 'sleek design', 1, '/images/porsche.jpg', '/images/porsche_thumb.jpg');

UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_model = 'Hummer';

UPDATE inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
