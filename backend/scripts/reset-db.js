const { Sequelize } = require("sequelize");
const { exec } = require("child_process");
require("dotenv").config();

async function resetDatabase() {
  // Database connection parameters
  const dbConfig = {
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "1234",
    host: process.env.PGHOST || "localhost",
    port: parseInt(process.env.PGPORT || "5432"),
    dialect: "postgres",
  };

  // Connect to postgres database (maintenance DB)
  const maintenanceDb = new Sequelize({
    ...dbConfig,
    database: "postgres", // Connect to default maintenance database
    logging: false,
  });

  try {
    // Test connection
    await maintenanceDb.authenticate();
    console.log("Connected to postgres database");

    // Database name to reset
    const dbName = process.env.PGDATABASE || "zapusermanagement";

    try {
      // Drop the database if it exists
      console.log(`Dropping database ${dbName} if it exists...`);
      await maintenanceDb.query(`DROP DATABASE IF EXISTS "${dbName}";`);
      console.log("Database dropped successfully");
    } catch (error) {
      console.error("Error dropping database:", error.message);
    }

    try {
      // Create the database
      console.log(`Creating database ${dbName}...`);
      await maintenanceDb.query(`CREATE DATABASE "${dbName}";`);
      console.log("Database created successfully");
    } catch (error) {
      console.error("Error creating database:", error.message);
      throw error;
    }

    // Close maintenance connection
    await maintenanceDb.close();

    // Connect to the newly created database
    const newDb = new Sequelize({
      ...dbConfig,
      database: dbName,
      logging: false,
    });

    try {
      await newDb.authenticate();
      console.log(`Connected to ${dbName} database`);

      // Create schema
      console.log("Creating schema zapusermanagement...");
      await newDb.query(`CREATE SCHEMA IF NOT EXISTS zapusermanagement;`);
      console.log("Schema created successfully");

      // Close the connection
      await newDb.close();
    } catch (error) {
      console.error("Error creating schema:", error.message);
      throw error;
    }

    // Run migrations and seeders using sequelize-cli
    console.log("Running migrations...");
    await runCommand("npx sequelize-cli db:migrate");

    console.log("Running seeders...");
    await runCommand("npx sequelize-cli db:seed:all");

    console.log("Database reset complete!");
  } catch (error) {
    console.error("Database reset failed:", error.message);

    if (maintenanceDb) {
      await maintenanceDb.close();
    }

    process.exit(1);
  }
}

// Helper function to run CLI commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        reject(error);
        return;
      }

      console.log(stdout);
      resolve(stdout);
    });
  });
}

// Run the reset
resetDatabase();
