const getDb = require("../util/database").getDb;

class Meal {
  constructor(title, description, price) {
    this.title = title;
    this.description = description;
    this.price = price;
  }

  async save() {
    const db = getDb();
    await db.collection("meals").insertOne(this);
  }

  static async fetchAll() {
    const db = getDb();
    const products = await db.collection("meals").find().toArray();

    return products;
  }
}

module.exports = Meal;
