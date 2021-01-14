CREATE TABLE IF NOT EXISTS merchant (
    merchant_id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL UNIQUE,
    merchant_type_id INTEGER NOT NULL,
    CONSTRAINT fk_merchant_type_id 
        FOREIGN KEY(merchant_type_id) 
        REFERENCES merchant_type(merchant_type_id)
);
