const mongoose = require('mongoose')

const MongoDBConnect = async (uri) => {
  try {
    await mongoose.connect(uri)
    console.log('database connect successfuly')
  } catch (err) {
    console.log('error in connecting to database: ', err.message)
  }
}

module.exports = MongoDBConnect
