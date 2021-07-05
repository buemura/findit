const UsersService = require("../services/UsersService");
const { StatusCodes } = require("http-status-codes");

class UsersController {
  static async showAllUsers(req, res) {
    const usersService = new UsersService();

    try {
      const users = await usersService.showAllUsers();
      return res.json(users);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showOneUser(req, res) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const user = await usersService.showOneUser(id);
      return res.json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showUsersQuantity(req, res) {
    const usersService = new UsersService();
    try {
      const usersQuantity = await usersService.showUsersQuantity();
      return res.json(usersQuantity);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const userInfo = req.body;
    const usersService = new UsersService();

    try {
      const user = await usersService.updateUser(userInfo, id);
      return res.json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const user = await usersService.deleteUser(id);
      return res.json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = UsersController;
