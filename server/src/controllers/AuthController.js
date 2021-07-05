const AuthService = require("../services/AuthService");
const { StatusCodes } = require("http-status-codes");
// const MissingData = require("../errors/MissingData");

class AuthController {
  static checkRegistrationFields(name, email, password) {
    if (!name) {
      throw new MissingData("name");
    }
    if (!email) {
      throw new MissingData("email");
    }
    if (!password) {
      throw new MissingData("password");
    }
  }

  static checkLoginFields(email, password) {
    if (!email) {
      // throw new MissingData("email");
    }
    if (!password) {
      // throw new MissingData("password");
    }
  }

  static async registerUser(req, res) {
    const { name, email, password } = req.body;
    const authService = new AuthService();

    try {
      AuthController.checkRegistrationFields(name, email, password);
      const users = await authService.registerUser({ name, email, password });
      return res.json(users);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const authService = new AuthService();

    try {
      AuthController.checkLoginFields(email, password);
      const users = await authService.loginUser({ email, password });
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = AuthController;
