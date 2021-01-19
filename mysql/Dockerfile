#FROM konkeydong/rpi-mysql:latest
#
#ARG EXECUTABLE_PATH=/root/bin
#ARG INSTALL_PATH_HOST=bin/install
#ARG INSTALL_PATH_REMOTE=/root/${INSTALL_PATH_HOST}
#
## Some dependencies and nice things to have while inside a docker container
#RUN apt-get update && \
#    apt-get install -y \
#        vim \
#        less \
#        iproute2
#
## Install sqlite3
## RUN DEBIAN_FRONTEND=noninteractive apt-get -yq --no-install-recommends install sqlite3=3.* && \
## 	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
## 	mkdir -p /root/db && \
##     mkdir -p $INSTALL_PATH_REMOTE
#
#WORKDIR /app
#COPY . /app
#EXPOSE 3306
#
#ENTRYPOINT [ "/bin/bash" ]

FROM debian

ARG MYSQL='/etc/init.d/mysql start && mysql -uroot --password="password"'
ARG MYSQL_WITH_DB="${MYSQL} expense_report"

RUN apt update -y && \
    apt install -y \
    mariadb-server \
    less \
    vim

RUN sed -i 's/bind-address/bind-address = 0.0.0.0 #/i' /etc/mysql/mariadb.conf.d/50-server.cnf

WORKDIR /app
COPY . /app
EXPOSE 3306

CMD /etc/init.d/mysql start && tail -f /dev/null
