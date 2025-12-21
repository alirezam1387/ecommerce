const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connect successfuly");
  } catch (err) {
    console.log("error in connecting to database: ", err.message);
  }
};

module.exports.mongoDB = ConnectDB;
