const util = require("util");

exports.handleSignUpValidator = function handleSignUpValidator(req, res, next) {
  req.checkBody({
    name: {
      notEmpty: true,
      errorMessage: "name should not be empty",
    },
    password: {
      notEmpty: true,
      isLength: {
        options: [{ min: 8 }],
        errorMessage: "password must be minimum 8 chars long",
      },
      errorMessage: "Invalid password",
    },
    email: {
      notEmpty: true,
      errorMessage: "email should not be empty",
    },
  });

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ error: true, message: util.inspect(errors) });
  }
  return next();
};

exports.handleSignInValidator = function handleSignInValidator(req, res, next) {
  req.checkBody({
    email: {
      notEmpty: true,
      errorMessage: "Email should not be empty",
    },
    password: {
      notEmpty: true,
      isLength: {
        options: [{ min: 8 }],
        errorMessage: "password must be minimum 8 chars long",
      },
      errorMessage: "Invalid secret",
    },
  });

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ error: true, message: util.inspect(errors) });
  }
  return next();
};

exports.logOutValidator = function (req, res, next) {
  return next();
};
