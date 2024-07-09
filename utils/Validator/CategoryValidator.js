const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/ValidatorMiddleware");
const Category = require("../../models/category")

exports.CreateAndUpdateCategoryValidator = [
    check("name")
        .notEmpty().withMessage("Category name is required")
        .custom(async (val) => {
            const existingCategory = await Category.findOne({ name: val });
            if (existingCategory) {
                return Promise.reject(new Error("Category name already exists"));
            }
        }),
        validatorMiddleware
];
