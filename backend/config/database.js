require("dotenv").config();

module.exports = {
  development: {
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "1234",
    database: process.env.PGDATABASE || "zapusermanagement",
    host: process.env.PGHOST || "127.0.0.1",
    port: parseInt(process.env.PGPORT || "5432"),
    dialect: "postgres",
    logging: console.log, // Enable logging
    dialectOptions: {
      ssl: false,
      prependSearchPath: true,
      multipleStatements: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorage: "sequelize",
    migrationStorageTableName: "SequelizeMeta",
  }
};