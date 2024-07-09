const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/ValidatorMiddleware");
const SubCategory = require("../../models/SubCategory");
const Category = require("../../models/category");
exports.CreateAndUpdateSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .custom(async (val) => {
      const existingCategory = await SubCategory.findOne({ name: val });
      if (existingCategory) {
        return Promise.reject(new Error("SubCategory name already exists"));
      }
    }),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belong to parent category")
    .custom(async (val, { req }) => {
        const category = await Category.findOne({_id: req.body.category});

        if (!category) {
            throw new Error("not category");
        }
    })
    .withMessage("SubCategory must belong to parent category"),

  validatorMiddleware,
];
