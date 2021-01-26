-- Load tables in the following order:
-- 1) merchant_type
-- 2) merchant
-- 3) expenses

LOAD DATA INFILE "/docker/container/path/to/file.txt"
INTO TABLE <table_name>
FIELDS TERMINATED BY "|"
LINES  TERMINATED BY "\n"
IGNORE 1 LINES;
