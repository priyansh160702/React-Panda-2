const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const getDb = require("../util/database").getDb;
const ErrorHandler = require("../util/ErrorHandler");

exports.signUp = async (req, res, next) => {
  try {
    const db = getDb();

    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation error", errors });
    }

    const userEmail = await db.collection("users").findOne({ email });

    if (userEmail) {
      const err = new Error("Email already exists!");
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User(email, hashedPassword);

    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const db = getDb();

  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Validation error", errors });
  }

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    const err = new Error("User not found!");
    err.statusCode = 404;
    throw err;
  }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    const err = new Error("Password does not match!");
    err.statusCode = 400;
    throw err;
  }

  return res.status(200).json({ message: "Logged in successfully." });
};
