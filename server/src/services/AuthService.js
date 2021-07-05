const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../models");
require("dotenv").config();

class AuthService {
  async registerUser({ name, email, password }) {
    const userAlreadyExists = await database.Users.findOne({
      where: { name, email },
    });

    if (userAlreadyExists) {
      throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await database.Users.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log({
      status: "OK",
      message: "User registered successfully!",
    });
    return { message: "User registered successfully!" };
  }

  async loginUser({ email, password }) {
    const user = await database.Users.findOne({ where: { email } });

    if (!user) {
      return { auth: false, message: `Email ${email} is not registered` };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { auth: false, message: "Authentication Failed" };
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1h",
      }
    );

    return { auth: true, message: "Authentication Successful", token };
  }
}

module.exports = AuthService;
