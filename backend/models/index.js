const Sequelize = require("sequelize");
const initModels = require("./init-models").initModels;
const config = require("../config/appConfig");
require("dotenv").config();

let sequelize;
if (config.database.DATABASE_URL) {
  sequelize = new Sequelize(config.database.DATABASE_URL, {
    schema: "zapusermanagement",
    logging: false,
    searchPath: "zapusermanagement",
    dialectOptions: {
      ssl: false, // Disable SSL for development
      prependSearchPath: true,
    },
  });
} else {
  sequelize = new Sequelize(
    config.database.dbname,
    config.database.username,
    config.database.password,
    {
      host: config.database.host,
      dialect: config.database.dialect,
      schema: "zapusermanagement",
      searchPath: "zapusermanagement",
      dialectOptions: {
        ssl: false, // Disable SSL for development
        prependSearchPath: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    }
  );
}

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Set the default schema for this connection
    await sequelize.query("SET search_path TO zapusermanagement;");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Load the model definitions into sequelize
const models = initModels(sequelize);

// Add the sequelize instance to the exported object
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
