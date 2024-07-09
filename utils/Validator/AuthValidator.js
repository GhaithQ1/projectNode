const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/ValidatorMiddleware");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.signinValidator = [
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

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (!user) {
        return Promise.reject(new Error("Incorrect E-email Or Password"));
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("passowrd required")
    .isLength({ min: 6 })
    .withMessage("Too short password")
    .custom(async (pass, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return Promise.reject(new Error("Incorrect E-email Or password"));
      }
    }),

  validatorMiddleware,
];

exports.protectValidtor = [
  check("Authorization").custom(async (val, { req }) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      val = req.headers.authorization.split(" ")[1];
    }

    if (!val) {
      return Promise.reject(
        new Error("you are not login ,please login to get access this route")
      );
    }

    const decoded = jwt.verify(val, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.userId);
    req.user = currentUser;
    if (!currentUser) {
      return Promise.reject(
        new Error("User associated with the token not found")
      );
    }
  }),
  validatorMiddleware,
];

exports.allowdeValidator = (roles) => [
  check().custom(async (val, { req }) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.userId);
    req.user = currentUser;
    if (!roles.includes(req.user.role)) {
      return Promise.reject(
        new Error("Your are not allowed to perform this action")
      );
    }
  }),
  validatorMiddleware,
];

exports.changePasswordValidator = [
  // check("id").isMongoId().withMessage("Invalid Category Id Format"),
  check("currentpassword")
    .notEmpty()
    .withMessage("you must enter your current password"),
  check("confirmpassword")
    .notEmpty()
    .withMessage("you must enter the password confirm"),
  check("password").custom(async (pass, { req }) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return Promise.reject(new Error("there is no user for id"));
    }

    const iscorructpassword = await bcrypt.compare(
      req.body.currentpassword,
      user.password
    );

    if (!iscorructpassword) {
      return Promise.reject(new Error("inCorruct current password"));
    }
    if (pass !== req.body.confirmpassword) {
      return Promise.reject(new Error("password confirmation inCorruct"));
    }
  }),
  validatorMiddleware,
];

exports.upadetUserData = [
  check("email").custom(async (val) => {
    const user = await User.findOne({ email: val });

    if (user) {
      return Promise.reject(new Error("E-email already in use"));
    }
  }),
  validatorMiddleware,
];

exports.forgotPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (!user) {
        return Promise.reject(
          new Error(`there is no user with this email ${val}`)
        );
      }
    }),
  validatorMiddleware,
];
exports.verifyPasswordValidator = [
  check("resetcode").custom(async (val) => {
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(val)
      .digest("hex");
    const user = await User.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return Promise.reject(new Error("Reset Code Invalid Or Expired"));
    }
  }),
  validatorMiddleware,
];
exports.resetPasswordValidator = [
  check("newpassword").isLength({ min: 6 }).withMessage("Too short password"),

  check("email").custom(async (val) => {
    const user = await User.findOne({ email: val });
    if (!user) {
      return Promise.reject(
        new Error(`there is no user with this email ${val}`)
      );
    }

    if (!user.passwordResetVerified) {
      return Promise.reject(new Error("Reset code not verifiyed"));
    }
  }),
  validatorMiddleware,
];
