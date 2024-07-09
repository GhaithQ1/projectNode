const { catchAsync } = require("async-handler-express");

const Reciew = require("../models/Review");


const factory = require("./HoundlerFactory")




exports.CreateReciew = factory.CreateOne(Reciew);


exports.GetAllReciew = factory.GetAll(Reciew)

exports.GetReciewById = factory.GetById(Reciew)
exports.UpdateReciew = factory.UpdateOne(Reciew)

exports.DeleteReciew = factory.DeleteOne(Reciew)

exports.Slugify = factory.Slugify()
