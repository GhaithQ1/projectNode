const { catchAsync } = require("async-handler-express");
const slugify = require("slugify");
const ApiFeatures = require("../utils/ApiFeatures");
exports.Slugify = () =>
  catchAsync(async (req, res, next) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    next();
  });

exports.CreateOne = (Moudle) =>
  catchAsync(async (req, res) => {
    await Moudle.create(req.body)
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        res.json(err);
      });
  });

exports.GetAll = (Moudle) =>
  catchAsync(async (req, res) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    const apiFeatures = new ApiFeatures(Moudle.find(filterObject), req.query)
    .filter()
    .sort()
    .fields()
    .search()
    .paginate();
    const Moudles = await apiFeatures.mongooseQuery;

    res.json({ results: Moudles.length, data: Moudles });
  });

exports.GetById = (Moudle, populateOP) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;
    let query = Moudle.findById(id);
    if (populateOP) {
      query = query.populate(populateOP);
    }

    const document = await query;
    res.json({ data: document });
  });

exports.UpdateOne = (Moudle) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Moudle.findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        res.json(err);
      });
  });

exports.DeleteOne = (Moudle) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Moudle.findByIdAndDelete(id)
      .then((result) => {
        res.json({ date: result });
      })
      .catch((err) => {
        res.json(err);
      });
  });
