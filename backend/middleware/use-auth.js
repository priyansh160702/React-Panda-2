const jwt = require("jsonwebtoken");

const useAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "somesupersecretlongstring");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  // Checking if Token verified or not
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};

module.exports = useAuth;
