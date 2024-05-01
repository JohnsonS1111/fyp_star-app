const mongoose = require("mongoose");
const connectToMongoDB = require("../dbConfig/dbConfig");
connectToMongoDB();
const tableSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Module: String,
    Description: String,
    Day: String,
    Time: String,
    Type: String,
    "Start Time": String,
    "End Time": String,
    Duration: String,
    Weeks: String,
    Location: String, 
    Staff:String
  },
  {
    timestamps: true,
  }
);
const Timetable = mongoose.models.Timetable || mongoose.model("Timetable", tableSchema);
module.exports = Timetable;
