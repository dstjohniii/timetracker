#!/usr/bin/env bash

./wait-for-it.sh database:5432
npx sequelize db:migrate 
npm start # must be last
