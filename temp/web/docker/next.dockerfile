FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/app
RUN mkdir /client
WORKDIR /usr/app/client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

COPY .env.local .

EXPOSE 3000

WORKDIR /usr/app/client/.next
CMD ["npm", "start"]