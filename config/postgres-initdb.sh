#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username postgres --port 5432 --file ./postgres-initdb.sql