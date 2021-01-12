# FROM debian:stable-slim
FROM postgres:latest

ARG EXECUTABLE_PATH=/root/bin
ARG INSTALL_PATH_HOST=bin/install
ARG INSTALL_PATH_REMOTE=/root/${INSTALL_PATH_HOST}

# Some dependencies and nice things to have while inside a docker container
RUN apt-get update && \
    apt-get install -y \
        vim \
        less \
        iproute2

# Install sqlite3
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq --no-install-recommends install sqlite3=3.* && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
	mkdir -p /root/db && \
    mkdir -p $INSTALL_PATH_REMOTE

WORKDIR /app
COPY --chown=postgres . /app
EXPOSE 5432
RUN touch /var/lib/postgresql/data && \
    chmod 750 -R /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql/data && \
    pg_createcluster -d /var/lib/postgresql/data 13 main
USER postgres

ENTRYPOINT [ "bash", "start.bash" ]
#ENTRYPOINT [ "sqlite3" ]

