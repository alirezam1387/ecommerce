const mongoose = require("mongoose");

const MongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connect successfuly");
  } catch (err) {
    console.log("error in connecting to database: ", err.message);
  }
};

module.exports = MongoDBConnect;
