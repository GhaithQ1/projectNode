const express = require("express");

const router = express.Router();
const subcategoryRoute = require("./SubCategoryRouter");
router.use("/:categoryId/subcategories", subcategoryRoute);

const {
  CreateAndUpdateCategoryValidator,
} = require("../utils/Validator/CategoryValidator");
const {
  CreateCategory,
  GetAllCategory,
  GetCategoryById,
  UpdateCategory,
  DeleteCategory,
  UplodeImage,
  ResizeImages,
  Slugify,
} = require("../services/CategoryServices");

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

    UplodeImage,
    ResizeImages,
    CreateAndUpdateCategoryValidator,
    CreateCategory
  )
  .get(GetAllCategory);
router
  .route("/:id")
  .get(GetCategoryById)
  .put(
    Slugify,
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    UplodeImage,
    ResizeImages,
    CreateAndUpdateCategoryValidator,
    UpdateCategory
  )
  .delete(
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    DeleteCategory
  );

module.exports = router;
