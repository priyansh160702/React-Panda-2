const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Meal {
  constructor(title, description, price, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  async save() {
    const db = getDb();

    let dbOp;

    if (this._id) {
      // Update
      dbOp = db
        .collection("meals")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("meals").insertOne(this);
    }

    return await dbOp;
  }

  static async fetchAll() {
    const db = getDb();
    const meals = await db.collection("meals").find().toArray();

    return meals;
  }

  static deleteById(mealId) {
    const db = getDb();
    return db
      .collection("meals")
      .deleteOne({ _id: new mongodb.ObjectId(mealId) });
  }
}

module.exports = Meal;
