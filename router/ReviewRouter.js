const express = require("express");

const router = express.Router();

const {
  CreateReviewValidator,
  UpdateReviewvalidator,
  DeleteReviewvalidator,
} = require("../utils/Validator/ReviewValidator");
const {
  CreateReciew,
  GetAllReciew,
  GetReciewById,
  UpdateReciew,
  DeleteReciew,
  Slugify,
} = require("../services/ReviewServices");

const {
  protectValidtor,
  allowdeValidator,
} = require("../utils/Validator/AuthValidator");

router
  .route("/")
  .post(
    Slugify,
    protectValidtor,
    allowdeValidator("user"),
    CreateReviewValidator,
    CreateReciew
  )
  .get(GetAllReciew);
router
  .route("/:id")
  .get(GetReciewById)
  .put(
    Slugify,
    protectValidtor,
    allowdeValidator("user"),
    UpdateReviewvalidator,
    UpdateReciew
  )
  .delete(
    protectValidtor,
    allowdeValidator(["user", "manger", "admen"]),
    DeleteReviewvalidator,
    DeleteReciew
  );

module.exports = router;
