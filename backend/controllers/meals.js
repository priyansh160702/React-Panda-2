const Meal = require("../models/meals");
const { validationResult } = require("express-validator");

const getDb = require("../util/database").getDb;

exports.getMeals = async (req, res, next) => {
  const meals = await Meal.fetchAll();

  return res
    .status(200)
    .send({ message: "Fetched meals successfully!", meals });
};

exports.addMeals = async (req, res, next) => {
  try {
    const db = getDb();

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    console.log(title);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation error", errors });
    }

    // const existingMeal = await db
    //   .collection("meals")
    //   .findOne({ title });

    // if (existingMeal) {
    //   const err = new Error("Meal name already exists!");
    //   err.statusCode = 403;
    //   throw err;
    // }

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

exports.editMeals = async (req, res, next) => {
  try {
    const db = getDb();

    const mealId = req.params.mealId;

    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation error", errors });
    }

    // const existingMeal = await db
    //   .collection("meals")
    //   .findOne({ title: updatedTitle });

    // if (existingMeal) {
    //   const err = new Error("Meal name already exists!");
    //   err.statusCode = 403;
    //   throw err;
    // }

    const meal = new Meal(
      updatedTitle,
      updatedDescription,
      updatedPrice,
      mealId
    );

    await meal.save();

    return res.status(200).send({ message: "Edited successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.deleteMeals = async (req, res, next) => {
  const mealId = req.params.mealId;

  await Meal.deleteById(mealId);

  return res.status(200).send({ message: "Deleted successfully!" });
};
