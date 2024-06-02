const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Order {
  constructor(
    order,
    addressData,
    totalAmount,
    userId,
    paymentId,
    paymentOrderId,
    paymentSignature
  ) {
    this.order = order;
    this.addressData = addressData;
    this.totalAmount = totalAmount;
    this.userId = userId;
    this.createdAt = new Date();
    this.paymentDetails = {
      paymentId,
      paymentOrderId,
      paymentSignature,
    };
  }

  async save() {
    const db = getDb();
    return await db.collection("orders").insertOne(this);
  }

  static async getOrders(id) {
    const db = getDb();

    const orders = await db.collection("orders").find({ userId: id }).toArray();

    const orderData = [];
    for (const order of orders) {
      const orderItem = {};
      orderItem.id = order._id;
      orderItem.orderedAt = order.createdAt;
      orderItem.totalAmount = order.totalAmount;

      const meals = [];
      for (const meal of order.order) {
        const { mealId, quantity } = meal;

        const mealItem = await db
          .collection("meals")
          .findOne({ _id: new mongodb.ObjectId(mealId) });

        const title = mealItem?.title;
        const price = mealItem?.price;

        meals.push({ title, price, quantity });
      }
      orderItem.meals = meals;

      orderData.push(orderItem);
    }

    return orderData;
  }
}

module.exports = Order;
