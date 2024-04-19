const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;

    db.on("open", () => console.log("Connceted to database"));
    db.on("error", (error) => {
      console.log("MongoDB connection error: ", error);
      process.exit();
    });
  } catch (err) {
    console.log("Error: ", err);
  }
}

module.exports = connectToMongoDB