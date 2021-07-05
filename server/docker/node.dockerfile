FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/app
RUN mkdir /server
WORKDIR /usr/app/server

COPY ./server/package*.json ./
RUN npm install

COPY ./server .

COPY ./server/.sequelizerc .
COPY ./server/.env .

EXPOSE 4000

CMD node src/server.js