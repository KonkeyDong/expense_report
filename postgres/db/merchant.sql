CREATE TABLE merchant (
    merchant_id      INTEGER     PRIMARY KEY,
    name             VARCHAR(40) NOT NULL UNIQUE,
    merchant_type_id INTEGER     NOT NULL,
    FOREIGN KEY (merchant_type_id) REFERENCES merchant_type (merchant_type_id)
);
