const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (cb) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Priyansh16:MongoPass123@cluster0.s3m1ro1.mongodb.net/react-panda?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected!");
    _db = client.db();
    cb();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDb = () => {
  try {
    if (_db) {
      return _db;
    }
  } catch (err) {
    const error = new Error("No database found :(");
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    throw error;
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
