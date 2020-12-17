FROM debian:stable-slim
MAINTAINER Jean-Avit Promis "docker@katagena.com"
LABEL org.label-schema.vcs-url="https://github.com/konkeydong/docker-sqlite3"
LABEL version="latest"
ARG INSTALL_PATH_HOST=bin/install
ARG INSTALL_PATH_REMOTE=/root/${INSTALL_PATH_HOST}

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
    mkdir -p $INSTALL_PATH_REMOTE

# Install perl DBI and sqlite3 modules. While I could use wget to download
# the .tar.gz files, I don't want to risk a change in the future. They're
# less than 1MB in size anyway.
COPY ./perl_db_modules.bash $INSTALL_PATH_REMOTE/.
COPY ./${INSTALL_PATH_HOST}/DBI-1.625.tar.gz $INSTALL_PATH_REMOTE/.
COPY ./${INSTALL_PATH_HOST}/DBD-SQLite-1.11.tar.gz $INSTALL_PATH_REMOTE/.
RUN bash $INSTALL_PATH_REMOTE/perl_db_modules.bash $INSTALL_PATH_REMOTE

WORKDIR /root/db

ENTRYPOINT [ "sqlite3" ]
