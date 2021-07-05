"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const password = "test";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          name: "Bruno Uemura",
          email: "bruno.uemura@gmail.com",
          password: await bcrypt.hash(password, 10),
          user_photo: "https://github.com/BrunoUemura.png",
          city: "Campinas",
          state: "SP",
          country: "Brazil",
          phone: "+55 19 99999-9999",
          occupation: "Software Engineer",
          about_me: "I am a Software Engineer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "José Lacerda",
          email: "jose.lacerda@gmail.com",
          password: await bcrypt.hash(password, 10),
          user_photo: "https://github.com/Joselacerdajunior.png",
          city: "Sumare",
          state: "SP",
          country: "Brazil",
          phone: "+55 19 98888-8888",
          occupation: "Software Developer",
          about_me: "I am a Software Developer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
