#!/bin/bash

# RUN THIS FILE FROM /bin/install INSIDE OF THE DOCKER CONTAINER!!!

BASE_PATH=$1

cd ${BASE_PATH}
# wget http://search.cpan.org/CPAN/authors/id/T/TI/TIMB/DBI-1.625.tar.gz -p ${BASE_PATH}/.
tar xvfz DBI-1.625.tar.gz
cd ${BASE_PATH}/DBI-1.625
perl Makefile.PL
make
make install

cd ${BASE_PATH}
# wget http://search.cpan.org/CPAN/authors/id/M/MS/MSERGEANT/DBD-SQLite-1.11.tar.gz -p ${BASE_PATH}/.
tar xvfz DBD-SQLite-1.11.tar.gz
cd ${BASE_PATH}/DBD-SQLite-1.11
sed -i 's/sqlite3_prepare(imp_dbh->db, statement, 0/sqlite3_prepare(imp_dbh->db, statement, -1/g' dbdimp.c
perl Makefile.PL
make
make install

cd ${BASE_PATH}
tar xvfz Moose-2.2014.tar.gz
cd ${BASE_PATH}/Moose-2.2014
perl Makefile.PL
make
make install
