const { catchAsync } = require("async-handler-express");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const Brand = require("../models/Brand");

const {uplodeSingleImage} = require("../middleware/uplodeImageMiddleware")
const factory = require("./HoundlerFactory")

exports.UplodeImage = uplodeSingleImage("image");

exports.ResizeImages = catchAsync(async (req, res, next) => {
    const filename = `brand_${uuidv4()}_${Date.now()}.jpeg`;
    if(req.file){ 
       await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uplodes/brand/${filename}`);
  
    req.body.image = filename;}
  
    next();
});


exports.CreateBrand = factory.CreateOne(Brand);


exports.GetAllBrand = factory.GetAll(Brand)

exports.GetBrandById = factory.GetById(Brand)
exports.UpdateBrand = factory.UpdateOne(Brand)

exports.DeleteBrand = factory.DeleteOne(Brand)

exports.Slugify = factory.Slugify()
