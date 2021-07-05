#!/bin/bash
docker-compose build
docker-compose up -d

cd server
npm install

sleep 15

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all