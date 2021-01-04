#!/bin/bash

# echo $HOST_ID
# chown -R john:john /var/lib/postgresql
service postgresql restart
psql -U postgres
