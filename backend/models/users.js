const { v4: uuidv4 } = require("uuid");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
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
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        field: "role_id",
      },
      // Change from jsonb to JSON for the role field
      role: {
        type: DataTypes.JSON, // Changed from jsonb to JSON
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255), // Changed from JSONB to STRING
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "zapusermanagement",
      timestamps: false,
      indexes: [
        {
          name: "users_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "users_email_idx",
          unique: true,
          fields: [{ name: "email" }],
        },
      ],
    }
  );
};
