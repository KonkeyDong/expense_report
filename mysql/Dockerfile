FROM debian
# LABEL maintainer=

ARG MYSQL='/etc/init.d/mysql start && mysql -uroot --password="password"'
ARG MYSQL_WITH_DB="${MYSQL} expense_report"

RUN apt update -y && \
    apt install -y \
    mariadb-server \
    less \
    vim

# Allow localhost connection
RUN sed -i 's/bind-address/bind-address = 0.0.0.0 #/i' /etc/mysql/mariadb.conf.d/50-server.cnf

WORKDIR /app
COPY . /app
EXPOSE 3306

CMD /etc/init.d/mysql start && tail -f /dev/null
