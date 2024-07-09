const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/ValidatorMiddleware");
const Review = require("../../models/Review");

exports.CreateReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("Ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 and 5"),
  check("user").isMongoId().withMessage("Invalid Review id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom(async (val, { req }) => {
      const review = await Review.findOne({
        user: req.user._id,
        product: req.body.product,
      });
      if (review) {
        return Promise.reject(new Error("You already created a review before"));
      }
    }),
  validatorMiddleware,
];

exports.UpdateReviewvalidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        return Promise.reject(new Error(`There is no review with id ${val}`));
      }

      if (review.user._id.toString() !== req.user._id.toString()) {
        return Promise.reject(
          new Error("Your are not allowed to perform this action")
        );
      }
    }),
  validatorMiddleware,
];
exports.DeleteReviewvalidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom(async (val, { req }) => {
      if (req.user.role === "user") {
        const review = await Review.findById(val);
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }
        
        if (review.user._id.toString() !== req.user._id.toString()) {
          
          return Promise.reject(
            new Error("Your are not allowed to perform this action")
          );
        }
      }
    }),
  validatorMiddleware,
];
