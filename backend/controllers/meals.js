const Meal = require("../models/meals");

exports.getMeals = async (req, res, next) => {
  const meals = await Meal.fetchAll();

  return res
    .status(200)
    .send({ message: "Fetched meals successfully!", meals });
};

exports.addMeals = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const meal = new Meal(title, description, price);

    await meal.save();

    return res.status(201).send({ message: "Meal added successfully!", meal });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
