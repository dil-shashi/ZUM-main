require("dotenv").config();
const app = require("./app");
const path = require("path");
const debug = require("debug")("stuffmapper:server");

const models = require("./models");

require("dotenv").config();

const port = normalizePort(process.env.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

// const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
console.log(`connecting by db url ${process.env.DATABASE_URL}`);
// models.sequelize.sync({ force: false }).then(() => {
app.listen(port, () => {
  console.log(
    `Express server listening on port ${app.get("port")} in ${
      app.settings.env
    } mode`
  );
});
app.on("error", onError);
app.on("listening", onListening);
// });
