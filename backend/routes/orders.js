const express = require("express");
const router = express.Router();

const useAuth = require("../middleware/use-auth");
const ordersController = require("../controllers/orders");

router.get("/", useAuth, ordersController.getOrder);
router.post("/", useAuth, ordersController.postOrder);

module.exports = router;
