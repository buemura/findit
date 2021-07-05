const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const auth = Router();

// ROUTES
auth.post("/api/auth/register", AuthController.registerUser);
auth.post("/api/auth/login", AuthController.loginUser);

module.exports = auth;
