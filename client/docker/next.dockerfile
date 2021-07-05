FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/app
RUN mkdir /client
WORKDIR /usr/app/client

COPY ./client/package*.json ./
RUN npm install

COPY ./client .

RUN npm run build

COPY ./client/.env.local .

EXPOSE 3000

WORKDIR /usr/app/client/.next
CMD ["npm", "start"]