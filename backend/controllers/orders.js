const crypto = require("crypto");

const Order = require("../models/orders");
const instance = require("../util/RazorPayInstance");

exports.getOrder = async (req, res, next) => {
  const userId = req.userId;

  const orderData = await Order.getOrders(userId);

  return res.status(200).send({ message: "Orders sent!", orderData });
};

exports.createOrder = async (req, res, next) => {
  const RazorpayId = process.env.RAZORPAY_API_ID;

  const totalAmount = req.body.totalAmount;

  const options = {
    amount: Number(totalAmount * 100), // amount in the smallest currency unit(Paisa)
    currency: "INR",
  };

  const razorPayOrder = await instance.orders.create(options);

  const paymentOrderId = razorPayOrder.id;

  return res.status(201).send({
    message: "Order created successfully!",
    paymentOrderId,
    RazorpayId,
  });
};

exports.paymentVerification = async (req, res, next) => {
  const userId = req.userId;

  const {
    orderData,
    addressData,
    totalAmount,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("Sig Received", razorpay_signature);
  console.log("Sig Generated", expectedSignature);

  const isAuthenticated = expectedSignature === razorpay_signature;

  if (isAuthenticated) {
    const order = new Order(
      orderData,
      addressData,
      totalAmount,
      userId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    await order.save();

    console.log(order);

    res.status(201).send({ message: "Order successful!" });
  } else {
    const err = new Error("Signature does not match!");
    err.statusCode = 404;
    next(err);
  }
};
