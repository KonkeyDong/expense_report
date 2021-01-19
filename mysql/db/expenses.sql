USE expense_report;

CREATE TABLE IF NOT EXISTS expenses (
    expenses_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    purchase_date DATE NOT NULL, -- yyyy-mm-dd format
    merchant_id INTEGER NOT NULL,
    cost NUMERIC(10,2) NOT NULL, -- store as cents; multiply cost by 100 to store nicely.
    note VARCHAR(100),
    hash_code VARCHAR(64) NOT NULL UNIQUE, -- for identifying if we have a duplicate more easily;
                                                     -- made from "<date>:<merchant_id>:<cost>"
    CONSTRAINT fk_merchant_id
    FOREIGN KEY (merchant_id) 
    REFERENCES merchant (merchant_id)
);
