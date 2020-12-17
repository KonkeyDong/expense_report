# docker-sqlite3

[![Docker pull](https://img.shields.io/docker/pulls/nouchka/sqlite3)](https://hub.docker.com/r/nouchka/sqlite3/)
[![Docker stars](https://img.shields.io/docker/stars/nouchka/sqlite3)](https://hub.docker.com/r/nouchka/sqlite3/)
[![Docker Automated buil](https://img.shields.io/docker/automated/nouchka/sqlite3.svg)](https://hub.docker.com/r/nouchka/sqlite3/)
[![Build Status](https://img.shields.io/travis/nouchka/docker-sqlite3/master)](https://travis-ci.org/nouchka/docker-sqlite3)
[![Docker size](https://img.shields.io/docker/image-size/nouchka/sqlite3/latest)](https://hub.docker.com/r/nouchka/sqlite3/)
[![Docker layers](https://img.shields.io/microbadger/layers/nouchka/sqlite3/latest)](https://hub.docker.com/r/nouchka/sqlite3/)
[![Codacy grade](https://img.shields.io/codacy/grade/0ac0a25def124b6da746d4701b9687ac)](https://hub.docker.com/r/nouchka/sqlite3/)

# Versions

* latest (based on debian:stable).

---

# Quick Start

```bash
bash quick_startup.sh
make exec # if you need to jump into the container
```

---

# Build / Make Commands

NOTE: You may want to change the username on `line 1` of `Makefile.docker` to your **Docker Hub** username: `DOCKER_NAMESPACE=<username>`

* `make install-docker` - Install Docker via command line. (**NOTE**: only verified on Linux Mint 20 OS.)
* `make build` - **Main way to build a Docker container**; default to latest build version.
* `make build-no-cache` - Same as `make build` but sets the `--no-cache` flag.
* `make build-latest`
* `make build-beta`
* `make build-version <version_number>`
* `make check` - Checks the version of the docker image currently used.
* `make update-version` - Update docker image version.
* `make start` - Boot up the Docker container. **Must be run in the directory where the `docker-compose.yml` file is located**.
* `make exec` - Enter a Docker container. Run `make start` first and in a separate terminal window before running this command.
* `make test` - Brings up the test container.
* `make hadolint` - Formats the `Dockerfile` to use **Docker Inc.'s** best practices.
* `make clean`
* `make clean-version`
* `make prune` - Cleanup all dangling Docker images.
* `make push` 
    - Push docker image to **Docker Hub**.
    - Remember to update the `DOCKER_NAMESPACE=<username>` to your username before pushing.
    - Please ensure that you have a public repository such as `{username}/sqlite3` on **Docker Hub**.

---

# Use


```bash
docker-compose run sqlite3
```

---

