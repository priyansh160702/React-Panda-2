const express = require("express");

const mealsController = require("../controllers/meals");
const useAuth = require("../middleware/use-auth");

const router = express.Router();

router.get("/meals", mealsController.getMeals);

router.post("/meals", useAuth, mealsController.addMeals);

router.patch("/meals/:mealId", useAuth, mealsController.editMeals);

router.delete("/meals/:mealId", useAuth, mealsController.deleteMeals);

module.exports = router;
