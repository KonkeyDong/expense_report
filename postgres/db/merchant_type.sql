CREATE TABLE IF NOT EXISTS merchant_type (
    merchant_type_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);
