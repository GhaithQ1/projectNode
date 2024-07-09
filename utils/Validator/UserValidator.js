const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/ValidatorMiddleware");
const User = require("../../models/User");

exports.CreateUsersValidator = [
  check("name").notEmpty().withMessage("Name Require"),
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        return Promise.reject(new Error("E-email already in use"));
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),

  validatorMiddleware,
];

exports.UpdateUserValidator = [
  check("email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        return Promise.reject(new Error("E-email already in use"));
      }
    }),
  validatorMiddleware,
];
