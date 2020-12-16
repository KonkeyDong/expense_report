FROM debian:stable-slim
MAINTAINER Jean-Avit Promis "docker@katagena.com"
LABEL org.label-schema.vcs-url="https://github.com/konkeydong/docker-sqlite3"
LABEL version="latest"

# Some dependencies and nice things to have while inside a docker container
RUN apt-get update && \
    apt-get install -y \
        vim \
        less \
        curl \
        wget \
        build-essential \
        libssl-dev \
        libsqlite3-dev \
        perl-doc

# Install sqlite3
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq --no-install-recommends install sqlite3=3.* && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
	mkdir -p /root/db && \
    mkdir -p /root/bin

WORKDIR /root/db

# Install perl DBI and sqlite3 modules
RUN bash ../bin/install/perl_db_modules.bash

ENTRYPOINT [ "sqlite3" ]
