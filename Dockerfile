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
        build-essential \
        libssl-dev

# Install latest version of node.js, npm, and the sql-lint command-line linter
RUN  nvm install $(nvm ls-remote | tail -n 1) && \
     curl https://www.npmjs.org/install.sh | sh && \
     npm install -g sql-lint

# Install sqlite3
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq --no-install-recommends install sqlite3=3.* && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
	mkdir -p /root/db

WORKDIR /root/db
ENTRYPOINT [ "sqlite3" ]
