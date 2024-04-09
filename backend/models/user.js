const getDb = require("../util/database").getDb;

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.isAdmin = false;
  }

  async save() {
    const db = getDb();

    return await db.collection("users").insertOne(this);
  }
}

module.exports = User;
