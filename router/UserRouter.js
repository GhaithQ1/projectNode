const express = require("express");

const router = express.Router();

const {
  CreateUsersValidator,
  UpdateUserValidator,
} = require("../utils/Validator/UserValidator.js");
const {
  protectValidtor,
  allowdeValidator,
} = require("../utils/Validator/AuthValidator.js");
const {
  CreateUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  Slugify,
} = require("../services/UserServcis");

router
  .route("/")
  .post(
    protectValidtor,
    allowdeValidator(["admen"]),
    CreateUsersValidator,
    Slugify,
    CreateUser
  )
  .get(GetAllUsers);
router
  .route("/:id")
  .get(GetUserById)
  .put(
    protectValidtor,
    allowdeValidator("admen"),
    UpdateUserValidator,
    Slugify,
    UpdateUser
  )
  .delete(protectValidtor, allowdeValidator(["admen", "manger"]), DeleteUser);

module.exports = router;
