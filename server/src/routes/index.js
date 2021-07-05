const { Router } = require("express");
const auth = require("./auth.routes");
const users = require("./users.routes");
const services = require("./services.routes");

const routes = Router();

// ROUTES
routes.get("/", (req, res) => {
  res.send({ message: "You are in the backend API" });
});
routes.use(auth, users, services);

module.exports = routes;
