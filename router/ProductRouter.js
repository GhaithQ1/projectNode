const express = require("express");

const router = express.Router();

const {
  CreateProduct,
  GetAllProduct,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
  UplodeImage,
  ResizeImages,
  Slugify,
} = require("../services/ProductServices");

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
    CreateProduct
  )
  .get(GetAllProduct);
router
  .route("/:id")
  .get(GetProductById)
  .put(
    Slugify,
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    UplodeImage,
    ResizeImages,
    UpdateProduct
  )
  .delete(
    protectValidtor,
    allowdeValidator(["admen", "manger"]),
    DeleteProduct
  );

module.exports = router;
