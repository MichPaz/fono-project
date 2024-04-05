FROM postgres:11-alpine

ARG POSTGRES_USER="postgres" \
    POSTGRES_PASSWORD="fono1595" \
    POSTGRES_DB="fono" \
    POSTGRES_PORT="5437"

ENV POSTGRES_USER=${POSTGRES_USER} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
    POSTGRES_DB=${POSTGRES_DB} \
    POSTGRES_PORT=${POSTGRES_PORT}

RUN mkdir -p /data

COPY ./postgresql.conf /data/postgresql.conf

VOLUME /data

CMD ["-p", "5437"]