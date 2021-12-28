"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        name: "Graham",
        email: "graham@timetracker.com",
        password: await bcrypt.hash("test1234", process.env.SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Denis",
        email: "denis@timetracker.com",
        password: await bcrypt.hash("test1234", process.env.SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gorog",
        email: "gorog@stoneelk.com",
        password: await bcrypt.hash("test1234", process.env.SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
