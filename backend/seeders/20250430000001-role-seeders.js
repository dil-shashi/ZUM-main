"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First make sure the schema exists
    await queryInterface.sequelize.query(
      "CREATE SCHEMA IF NOT EXISTS zapusermanagement;"
    );

    return queryInterface.bulkInsert(
      {
        tableName: "roles",
        schema: "zapusermanagement",
      },
      [
        {
          id: uuidv4(),
          name: "admin",
          created_on: new Date(),
          updated_on: new Date(),
        },
        {
          id: uuidv4(),
          name: "user",
          created_on: new Date(),
          updated_on: new Date(),
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: "roles",
        schema: "zapusermanagement",
      },
      {
        name: ["admin", "user"],
      }
    );
  },
};
