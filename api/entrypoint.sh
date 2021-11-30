#!/bin/sh

./wait-for-it.sh database:5432
npx sequelize db:migrate 
echo "we made it."

# Run the main container command.
exec "$@"