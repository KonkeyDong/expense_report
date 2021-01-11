#!/bin/bash

pg_createcluster 13 main -d /var/lib/postgresql/data
service postgresql start
psql -U postgres