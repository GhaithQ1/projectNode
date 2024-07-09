const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  CreateAndUpdateSubCategoryValidator,
} = require("../utils/Validator/SubCategoryValidator");

const {
  CreateSubCategory,
  GetAllSubCategory,
  GetSubCategoryById,
  UpdateSubCategory,
  DeleteSubCategory,
  Slugify,
} = require("../services/SubcategoryServices");

const {
  protectValidtor,
  allowdeValidator,
} = require("../utils/Validator/AuthValidator");

router
  .route("/")
  .post(
    Slugify,
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    CreateAndUpdateSubCategoryValidator,
    CreateSubCategory
  )
  .get(GetAllSubCategory);
router
  .route("/:id")
  .get(GetSubCategoryById)
  .put(
    Slugify,
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    CreateAndUpdateSubCategoryValidator,
    UpdateSubCategory
  )
  .delete(
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    DeleteSubCategory
  );

module.exports = router;
