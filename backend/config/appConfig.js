const development = {
  database: {
    username: process.env.PGUSER || "postgres",
    dbname: process.env.PGDATABASE || "zapusermanagement",
    password: process.env.PGPASSWORD || "1234", // Added password default
    host: process.env.PGHOST || "localhost", // Changed from "1234" to "localhost"
    port: process.env.PGPORT || 5432,
    dialect: "postgres",
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgres://postgres:1234@127.0.0.1:5432/zapusermanagement",
  },
  jwtSecret: process.env.JWT_SECRET || "f!DT3[i+Zl(W}17:%@]Tly*#/F&&L",
  appPort: process.env.PORT || 8080,
};

module.exports =
  global.process.env.NODE_ENV === "production" ? production : development;
