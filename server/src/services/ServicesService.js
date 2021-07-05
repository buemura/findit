const database = require("../models");
class ServicesService {
  async createService(serviceInfo) {
    const userExists = await database.Users.findOne({
      where: { id: serviceInfo.user_id },
    });

    if (!userExists) {
      throw new Error("User associated does not exist!");
    }

    await database.Services.create(serviceInfo);
    return { message: `Service created successfully!` };
  }

  async showAllServices(where) {
    return await database.Services.findAll({
      where: { ...where },
      include: {
        model: database.Users,
        as: "User",
      },
    });
  }

  async showOneService(id) {
    return await database.Services.findOne({
      where: { id },
      include: {
        model: database.Users,
        as: "User",
      },
    });
  }

  async showServicesQuantity() {
    const { count } = await database.Services.findAndCountAll();
    return count;
  }

  async updateService(serviceInfo, id) {
    const serviceExists = await database.Services.findOne({ where: { id } });

    if (!serviceExists) {
      throw new Error("Service does not exist!");
    }

    await database.Services.update(serviceInfo, { where: { id } });
    return { message: `UPDATED service id ${id}` };
  }

  async deleteService(id) {
    await database.Services.destroy({ where: { id } });
    return { message: `DELETED service id ${id}` };
  }

  async showServicesFromUser(user_id) {
    return await database.Services.findAll({
      where: { user_id },
      include: {
        model: database.Users,
        as: "User",
      },
    });
  }
}

module.exports = ServicesService;
