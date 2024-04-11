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

    console.log(meal);

    await meal.save();

    return res.status(201).send({ message: "Meal added successfully!", meal });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editMeals = async (req, res, next) => {
  const mealId = req.params.mealId;

  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  const meal = new Meal(updatedTitle, updatedDescription, updatedPrice, mealId);

  await meal.save();

  return res.status(200).send({ message: "Edited successfully!" });
};

exports.deleteMeals = async (req, res, next) => {
  const mealId = req.params.mealId;

  await Meal.deleteById(mealId);

  return res.status(200).send({ message: "Deleted successfully!" });
};
