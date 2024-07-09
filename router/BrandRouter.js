const express = require("express");

const router = express.Router();

const {
  CreateAndUpdateCategoryValidator,
} = require("../utils/Validator/CategoryValidator");
const {
  CreateBrand,
  GetAllBrand,
  GetBrandById,
  UpdateBrand,
  DeleteBrand,
  UplodeImage,
  ResizeImages,
  Slugify,
} = require("../services/BrandServices");

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
    CreateBrand
  )
  .get(GetAllBrand);
router
  .route("/:id")
  .get(GetBrandById)
  .put(
    Slugify,
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    UplodeImage,
    ResizeImages,
    UpdateBrand
  )
  .delete(protectValidtor, allowdeValidator(["admen", "manger"]), DeleteBrand);

module.exports = router;
