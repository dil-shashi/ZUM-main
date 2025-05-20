const { Sequelize } = require("sequelize");
const config = require("./config/database.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

(async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Check if schema exists
    const [results] = await sequelize.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'zapusermanagement';"
    );

    if (results.length === 0) {
      console.log("Schema does not exist, creating it...");
      await sequelize.query("CREATE SCHEMA IF NOT EXISTS zapusermanagement;");
      console.log("Schema created.");
    } else {
      console.log("Schema exists.");
    }

    // Check if table exists
    const [tableResults] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'zapusermanagement' AND table_name = 'roles';"
    );

    if (tableResults.length === 0) {
      console.log("Roles table does not exist.");
    } else {
      console.log("Roles table exists.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
})();
