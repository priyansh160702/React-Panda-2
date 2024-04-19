const Order = require("../models/orders");

exports.getOrder = async (req, res, next) => {
  const userId = req.userId;

  const orderData = await Order.getOrders(userId);

  return res.status(200).send({ message: "Orders sent!", orderData });
};

exports.postOrder = async (req, res, next) => {
  const userId = req.userId;
  const orderData = req.body.order;
  const addressData = req.body.addressData;
  const totalAmount = req.body.totalAmount;

  const order = new Order(orderData, addressData, totalAmount, userId);

  await order.save();

  return res.status(201).send({
    message: "Order saved successfully!",
  });
};
