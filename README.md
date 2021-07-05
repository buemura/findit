# Find it

The application of Find It project. \

## Technologies

In this application the technologies below will be used:

- Node.js
- Express
- Sequelize
- React.js
- Next.js
- Docker
- Heroku

## Setup

Firstly you can clone by using the command below:

```bash
git clone https://github.com/BrunoUemura/findit.git
```

Or download the zip file directly from [Github](https://github.com/BrunoUemura/findit/archive/refs/heads/master.zip) and unzip it.

After, downloading open the project direcotiry and run the following commands:

### Development environment

_Make sure to check the environment variables_

Frontend:

- Go to client directory `cd client`
- To install the dependencies `npm install`
- To run the project `npm run dev`

Backend:

- Go to server directory `cd server`
- To install the dependencies `npm install`
- To run the database migrations `npx sequelize-cli db:migrate`
- To run the project `npm run dev`

### Test environment

_Make sure to check the environment variables_
For testing environment, it is recomended to use docker.

- In the root directory, run the Shell Scipt file in bash `sh dockerize.sh`
  - This will build the **Backend** and **Frontend** in docker and also, it will execute the migrations and seeders.
  - After finishing the building, access `http://localhost` in the browser.

### Production environment

_Make sure to check the environment variables_

- To install the dependencies `npm install`
- To run the database migrations `npx sequelize-cli db:migrate`
- To run the project `npm start`

## Authors

- Bruno Hideki Uemura [linkedin](https://www.linkedin.com/in/bruno-hideki-uemura-918589139/), [Github](https://github.com/BrunoUemura)
- Jose Lacerda Junior [linkedin](https://www.linkedin.com/in/jos%C3%A9-lacerdajr98/), [Github](https://github.com/joselacerdajunior)
