#!/bin/bash

/etc/init.d/mysql start && /usr/bin/mysql -uroot --password="password" < /app/db/initialize_user.sql
/usr/bin/mysql -u mysql --password="password" -e 'CREATE DATABASE IF NOT EXISTS expense_report;'

# cd /app/db
declare -a sql_files=("merchant_type.sql" "merchant.sql" "expenses.sql")
for sql_file in "${sql_files[@]}"
do
    echo "now adding ${sql_file}"
    /usr/bin/mysql -u mysql --password="password" < /app/db/${sql_file}
done
