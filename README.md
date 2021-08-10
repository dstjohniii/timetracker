# timetracker
A react time tracker app that uses graphQL


## Creating and Connecting to the Database
docker run --name ttdb -e POSTGRES_PASSWORD=whateverwewant -d postgres
docker exec -it ttdb bash
su postgres
psql
\conninfo

## Magical database Postgres connection
docker-compose run database bash
psql --host=database --username=unicorn_user --dbname=rainbow_database
magical_password

## Testing
http://localhost:9002/graphql
