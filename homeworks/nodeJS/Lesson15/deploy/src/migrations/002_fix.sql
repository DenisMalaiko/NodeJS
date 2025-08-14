CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    price INTEGER NOT NULL
);

INSERT INTO products (title, description, price) VALUES
    ('Title 1', 'Description 1', 10),
    ('Title 2', 'Description 2', 20);