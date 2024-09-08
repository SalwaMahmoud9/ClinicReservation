CREATE TYPE user_type AS ENUM ('doctor', 'reception');
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    type user_type NOT NULL,
    password VARCHAR(255) NOT NULL
    );