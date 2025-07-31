CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    balance NUMERIC NOT NULL CHECK (balance > 0)
)


CREATE TABLE IF NOT EXISTS movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_id UUID NOT NULL,
    to_id UUID NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    created_at TIMESTAMPTZ DEFAULT now()
)