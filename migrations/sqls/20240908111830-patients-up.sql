CREATE TABLE IF NOT EXISTS patients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    gender VARCHAR(10),
    birthdate Date,
    address VARCHAR(255),
    description VARCHAR(255)
    );