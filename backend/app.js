const express = require("express");

const mealsRoutes = require("./routes/meals");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const { mongoConnect } = require("./util/database");

const app = express();

app.use(express.json());

// CORS Error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  next();
});

app.use(mealsRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);

app.use((error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";
  console.log(error);

  return res.status(statusCode).json({ message });
});

mongoConnect((client) => {
  app.listen(process.env.PORT);
});
