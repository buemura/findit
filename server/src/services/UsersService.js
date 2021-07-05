const database = require("../models");

class UsersService {
  async showAllUsers() {
    return await database.Users.findAll();
  }

  async showOneUser(id) {
    return await database.Users.findOne({ where: { id } });
  }

  async showUsersQuantity() {
    const { count } = await database.Users.findAndCountAll();
    return count;
  }

  async updateUser(userInfo, id) {
    const userExists = await database.Users.findOne({ where: { id } });

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    await database.Users.update(userInfo, { where: { id } });
    return { message: `UPDATED user id ${id}` };
  }

  async deleteUser(id) {
    await database.Users.destroy({ where: { id } });
    return { message: `DELETED user id ${id}` };
  }
}

module.exports = UsersService;
