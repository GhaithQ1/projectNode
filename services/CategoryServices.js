const { catchAsync } = require("async-handler-express");

const Category = require("../models/category");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const {uplodeSingleImage} = require("../middleware/uplodeImageMiddleware")
const factory = require("./HoundlerFactory")

exports.UplodeImage = uplodeSingleImage("image");

exports.ResizeImages = catchAsync(async (req, res, next) => {
    const filename = `category_${uuidv4()}_${Date.now()}.jpeg`;
    if(req.file){ 
       await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uplodes/category/${filename}`);
  
    req.body.image = filename;}
  
    next();
});


exports.CreateCategory = factory.CreateOne(Category);


exports.GetAllCategory = factory.GetAll(Category)

exports.GetCategoryById = factory.GetById(Category)
exports.UpdateCategory = factory.UpdateOne(Category)

exports.DeleteCategory = factory.DeleteOne(Category)

exports.Slugify = factory.Slugify()
