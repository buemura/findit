const { Router } = require("express");
const UsersController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

const users = Router();

// ROUTES
users.get("/api/users", UsersController.showAllUsers);
users.get("/api/users/:id", UsersController.showOneUser);
users.get("/api/users/all/count", UsersController.showUsersQuantity);
users.put("/api/users/:id", authMiddleware, UsersController.updateUser);
users.delete("/api/users/:id", authMiddleware, UsersController.deleteUser);

module.exports = users;
