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
psql --host=localhost --username=unicorn_user --dbname=rainbow_database --port=5432
magical_password

## Testing
http://localhost:9002/graphql


## Tutoirials used
-Sequalize: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize
