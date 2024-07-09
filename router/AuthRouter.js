const express = require("express");

const router = express.Router();

const {
  signinValidator,
  loginValidator,
  upadetUserData,
  changePasswordValidator,
  forgotPasswordValidator,
  verifyPasswordValidator,
  resetPasswordValidator,
  protectValidtor
} = require("../utils/Validator/AuthValidator.js");

const {
  SignIn,
  LogIn,
  GetMyData,
  UpdateLoggedUser,
  ChangeMyPassword,
  ForgotPassword,
  verifyResetCode,
  resetPassword,
} = require("../services/AuthServcis.js");

const {GetUserById} = require("../services/UserServcis.js")

router.route("/getmydata").get(protectValidtor,GetMyData,GetUserById);
router.route("/changepassword").put(protectValidtor,changePasswordValidator,ChangeMyPassword);
router.route("/updateuserdata").put(protectValidtor,upadetUserData,UpdateLoggedUser);

router.route("/signin").post(signinValidator, SignIn);
router.route("/login").post(loginValidator, LogIn);
router.route("/forgotpassword").post(forgotPasswordValidator,ForgotPassword);
router.route("/verifyresetcode").post(verifyPasswordValidator,verifyResetCode);
router.route("/resetPassword").put(resetPasswordValidator,resetPassword);

module.exports = router;
