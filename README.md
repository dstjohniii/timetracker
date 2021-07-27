# timetracker
A react time tracker app that uses graphQL


## Creating and Connecting to the Database
docker run --name ttdb -e POSTGRES_PASSWORD=whateverwewant -d postgres
docker exec -it ttdb bash
su postgres
psql
\conninfo
