const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "roles_name_key",
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "roles",
      schema: "zapusermanagement",
      timestamps: false,
      indexes: [
        {
          name: "roles_name_key",
          unique: true,
          fields: [{ name: "name" }],
        },
        {
          name: "roles_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
