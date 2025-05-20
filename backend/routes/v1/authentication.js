const express = require("express");

const router = express.Router();
const authenticationController = require("./../../controller/authentication");
const authenticationService = require("./../../service/authenticationService");
const tokenService = require("./../../service/tokenService");

router.post(
  "/auth/login",
  authenticationService.handleSignInValidator,
  authenticationController.handleSignIn
);

router.post(
  "/auth/register",
  authenticationService.handleSignUpValidator,
  authenticationController.handleSignUp
);

router.post(
  "/auth/register-admin",
  authenticationService.handleSignUpValidator,
  authenticationController.handleSignUpAdmin
);

// New user management routes - protected with auth middleware
router.get(
  "/users",
  //tokenService.isBearerAuthenticated,
  authenticationController.getUsers
);

router.post(
  "/users",
  authenticationService.handleSignUpValidator,
  authenticationController.handleSignUp
);

router.get(
  "/users/:id",
  tokenService.isBearerAuthenticated,
  authenticationController.getUserById
);

router.patch(
  "/users/:id",
  //tokenService.isBearerAuthenticated,
  authenticationController.updateUser
);

router.delete(
  "/users/:id",
  //tokenService.isBearerAuthenticated,
  authenticationController.deleteUser
);

module.exports = router;
