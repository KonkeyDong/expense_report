# Expense Report

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
./cmd.bash exec { node | mysql } # quickly jump into a container
```

---

# Commands

Run `./cmd.bash help` to get a list of command arguments for the `cmd.bash` script to run for this project.

---

# Use


```bash
./cmd.bash start # start docker containers via docker-compose start
```

Then, jump inside of mysql and alter:

```bash
./cmd.bash exec mysql # exec into `mysql` container
mysql -u root -p # start a mysql command prompt session
```

After starting a mysql session, type:

```sql
ALTER USER 'mysql' IDENTIFIED WITH mysql_native_password BY 'password'
```


---

