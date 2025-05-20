const express = require("express");

const router = express.Router();
const authenticationRoutes = require("./v1/authentication");

router.get("/", (req, res) =>
  res.status(200).send({
    error: false,
    message: "Welcome to the usermanagement.",
  })
);

router.use("/", authenticationRoutes);

module.exports = router;
