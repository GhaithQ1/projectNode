const { catchAsync } = require("async-handler-express");

const User = require("../models/User");

const factory = require("./HoundlerFactory")
exports.CreateUser = factory.CreateOne(User)

exports.GetAllUsers = factory.GetAll(User)

exports.GetUserById = factory.GetById(User)
exports.UpdateUser =catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, slug, email, role } = req.body;
    await User.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        email,
        role,
      },
      { new: true }
    )
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        res.json(err);
      });
});

exports.DeleteUser = factory.DeleteOne(User)
exports.Slugify = factory.Slugify();

