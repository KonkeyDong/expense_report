CREATE TABLE expense_report (
    expense_report_id INTEGER  PRIMARY KEY, -- made from combo of date, merchant_id, and cost as a 1-way hash
    [date]            DATE     NOT NULL, -- YYYYMMDD format
    merchant_id       INTEGER  NOT NULL,
    cost              DECIMAL  NOT NULL,
    note              VARCHAR(100),
    FOREIGN KEY (merchant_id) REFERENCES merchant (merchant_id)
);
