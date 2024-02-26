const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const getDb = require("../util/database").getDb;

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
      return res.status(409).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User(email, hashedPassword);

    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    const error = new Error(err);
    if (!error.statusCode) {
      err.statusCode = 500;
    }
    next(error);
  }
};
