CREATE TABLE expense_report (
    expense_report_id INTEGER       PRIMARY KEY AUTOINCREMENT,
    purchase_date     DATE          NOT NULL, -- yyyy-mm-dd format
    merchant_id       INTEGER       NOT NULL,
    cost              INTEGER       NOT NULL, -- store as cents; multiply cost by 100 to store nicely.
    note              VARCHAR(100),
    hash_code         VARCHAR(64)   NOT NULL UNIQUE, -- for identifying if we have a duplicate more easily;
                                                     -- made from "<date>:<merchant_id>:<cost>"
    FOREIGN KEY (merchant_id) REFERENCES merchant (merchant_id)
);
