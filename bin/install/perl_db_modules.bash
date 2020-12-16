#!/bin/bash

BASE_PATH=/root/bin/install

wget http://search.cpan.org/CPAN/authors/id/T/TI/TIMB/DBI-1.625.tar.gz
tar xvfz DBI-1.625.tar.gz
cd ${BASE_PATH}/DBI-1.625
perl Makefile.PL
make
make install

wget http://search.cpan.org/CPAN/authors/id/M/MS/MSERGEANT/DBD-SQLite-1.11.tar.gz
tar xvfz DBD-SQLite-1.11.tar.gz
cd ${BASE_PATH}/DBD-SQLite-1.11
perl Makefile.PL
make
make install
