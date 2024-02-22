const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Priyansh16:MongoPass123@cluster0.s3m1ro1.mongodb.net/react-panda?retryWrites=true&w=majority&appName=Cluster0"
    );

    _db = client.db();

    callback();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    throw err;
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw new Error("No database found");
};

module.exports = {
  mongoConnect,
  getDb,
};
