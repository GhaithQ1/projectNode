const { catchAsync } = require("async-handler-express");

const Product = require("../models/Product");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const { uplodeMixOfImage } = require("../middleware/uplodeImageMiddleware");
const factory = require("./HoundlerFactory");
const ApiFeatures = require("../utils/ApiFeatures");

exports.UplodeImage = uplodeMixOfImage([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

// Middleware لتغيير حجم الصور
exports.ResizeImages = catchAsync(async (req, res, next) => {
  if (req.files && req.files.imageCover) {
    const filename = `product_${uuidv4()}_${Date.now()}_cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/product/${filename}`);
    req.body.imageCover = filename;
  }
  if (req.files && req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const filename = `product_${uuidv4()}_${Date.now()}_${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/product/${filename}`);
        req.body.images.push(filename);
      })
    );
  }
  next();
});

exports.CreateProduct = factory.CreateOne(Product);

exports.GetAllProduct = factory.GetAll(Product)
exports.GetProductById = factory.GetById(Product, "reviews");
exports.UpdateProduct = factory.UpdateOne(Product);

exports.DeleteProduct = factory.DeleteOne(Product);

exports.Slugify = factory.Slugify();
