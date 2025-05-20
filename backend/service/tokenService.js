const jsonWebToken = require("jsonwebtoken");

const appConfig = require("./../config/appConfig");
const model = require("../models");

exports.isBearerAuthenticated = function isBearerAuthenticated(req, res, next) {
  const token =
    req.headers.authorization.split(" ")[1] ||
    req.query.token ||
    req.headers["x-access-token"];
  if (token) {
    jsonWebToken.verify(token, appConfig.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      }
      req.decoded = decoded;
      model.users
        .findAll({
          where: { email: decoded.email },
        })
        .then((user) => {
          if (user.length > 0) {
            return next();
          } else {
            return res.status(400).send({
              error: true,
              message: "The email not registered with us.",
            });
          }
        })
        .catch((err) => res.status(500).send({ error: err.message }));
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
};
