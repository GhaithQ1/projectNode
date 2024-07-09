

const SubCategory = require("../models/SubCategory");

const factory = require("./HoundlerFactory")



exports.CreateSubCategory = factory.CreateOne(SubCategory);


exports.GetAllSubCategory = factory.GetAll(SubCategory)

exports.GetSubCategoryById = factory.GetById(SubCategory)
exports.UpdateSubCategory = factory.UpdateOne(SubCategory)

exports.DeleteSubCategory = factory.DeleteOne(SubCategory)

exports.Slugify = factory.Slugify()
