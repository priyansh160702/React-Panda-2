const Order = require("../models/orders");

exports.getOrder = async (req, res, next) => {
  const userId = req.userId;

  const orderData = await Order.getOrders(userId);
  // console.log(orderData);

  return res.status(200).send({ message: "Orders sent!", orderData });
};

exports.postOrder = async (req, res, next) => {
  const userId = req.userId;
  const orderData = req.body.order;
  const addressData = req.body.addressData;

  const order = new Order(orderData, addressData, userId);

  await order.save();

  return res.status(201).send({
    message: "Order saved successfully!",
  });
};
