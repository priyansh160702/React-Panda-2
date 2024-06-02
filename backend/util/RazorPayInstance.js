// Payment Gateway Instance
const RazorPay = require("razorpay");

const RazorPayInstance = new RazorPay({
  key_id: process.env.RAZORPAY_API_ID,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports = RazorPayInstance;
