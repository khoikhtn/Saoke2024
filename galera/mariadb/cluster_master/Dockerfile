FROM mariadb

COPY ../src/saoke.csv /saoke.csv
COPY ../src/init.sql /docker-entrypoint-initdb.d/init.sql

ENV MARIADB_ROOT_PASSWORD 1
ENV MARIADB_DATABASE test

CMD ["--wsrep-new-cluster"]
