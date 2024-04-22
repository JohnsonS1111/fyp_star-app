const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("connectd to db")
   
  } catch (err) {
    console.log("Error: ", err);
  }
}

module.exports = connectToMongoDB