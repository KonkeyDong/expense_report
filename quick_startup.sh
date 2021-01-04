#!/bin/bash

mkdir -p ~/docker/volumes/postgres

make install-docker
make pull
make build
make start
