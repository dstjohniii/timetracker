"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        name: "Graham",
        email: "graham@timetracker.com",
        password: "test1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Denis",
        email: "denis@timetracker.com",
        password: "test1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gorog",
        email: "gorog@stoneelk.com",
        password: "test1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
