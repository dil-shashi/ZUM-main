"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create schema if it doesn't exist
    console.log("Creating schema zapusermanagement...");
    await queryInterface.sequelize.query(
      "CREATE SCHEMA IF NOT EXISTS zapusermanagement;"
    );

    // Create roles table with UUID
    console.log("Creating table roles in schema zapusermanagement...");
    await queryInterface.createTable(
      {
        tableName: "roles",
        schema: "zapusermanagement",
      },
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        created_on: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_on: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // Drop the roles table
    console.log("Dropping table roles in schema zapusermanagement...");
    await queryInterface.dropTable({
      tableName: "roles",
      schema: "zapusermanagement",
    });

    // Drop the schema
    console.log("Dropping schema zapusermanagement...");
    await queryInterface.sequelize.query(
      "DROP SCHEMA IF EXISTS zapusermanagement CASCADE;"
    );
  },
};