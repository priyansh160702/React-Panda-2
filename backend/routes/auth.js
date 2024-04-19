const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name", "This field cannot be empty.").trim().notEmpty(),
    body("email", "This field cannot be empty.")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Enter valid email.")
      .normalizeEmail(),
    body("password", "This field cannot be empty.")
      .trim()
      .notEmpty()
      .withMessage("This field cannot be empty.")
      .isLength({ min: 5 })
      .withMessage("Password should be at least 5 characters long")
      .isAlphanumeric(),

    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("This field cannot be empty.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          const err = new Error("Confirm password does not match!");
          err.statusCode = 422;
          throw err;
        } else {
          return true;
        }
      }),
  ],
  authController.signUp
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Enter valid email."),
    body("password", "Password should be at least 5 characters long")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.login
);

module.exports = router;
