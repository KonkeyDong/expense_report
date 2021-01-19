USE expense_report;

CREATE TABLE IF NOT EXISTS merchant_type (
    merchant_type_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE
);

quit
