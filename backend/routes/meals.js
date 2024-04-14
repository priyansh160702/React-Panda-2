const express = require("express");
const { body } = require("express-validator");

const mealsController = require("../controllers/meals");
const useAuth = require("../middleware/use-auth");

const router = express.Router();

const validation = [
  body("title").notEmpty().withMessage("This field cannot be empty"),
  body("description").notEmpty().withMessage("This field cannot be empty"),
  body("price", "It should be a number")
    .isNumeric()
    .notEmpty()
    .withMessage("This field cannot be empty"),
];

router.get("/meals", mealsController.getMeals);

router.post("/meals", validation, useAuth, mealsController.addMeals);

router.patch("/meals/:mealId", validation, useAuth, mealsController.editMeals);

router.delete("/meals/:mealId", useAuth, mealsController.deleteMeals);

module.exports = router;
