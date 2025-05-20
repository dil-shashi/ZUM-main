module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
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
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        role_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: { schema: "zapusermanagement", tableName: "roles" },
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
        role: {
          type: Sequelize.JSON, // Changed from jsonb to JSON
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING(255), // Changed from JSONB to STRING
          allowNull: true,
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
        last_login: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        schema: "zapusermanagement",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: "users",
      schema: "zapusermanagement",
    });
  },
};
