DROP TABLE IF EXISTS movements;
DROP TABLE IF EXISTS accounts;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    balance NUMERIC NOT NULL CHECK (balance > 0)
);

CREATE TABLE IF NOT EXISTS movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_id UUID NOT NULL,
    to_id UUID NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO accounts (id, balance) VALUES
    ('5c9c1e26-7f36-4b4e-9a10-1c9b7d7783e4', 1000),
    ('2c34aa99-cb53-408d-8610-4f2bc93b0e0a', 2000),
    ('35e0536b-0c41-4d3e-9c60-d579b7f2cc8c', 3000);