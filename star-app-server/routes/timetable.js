const express = require("express");
const router = express.Router();
const connectToMongoDB = require("../dbConfig/dbConfig");
const XLSX = require("xlsx");
const fileUpload = require("express-fileupload");
const Timetable = require("../models/Timetable");
const middleware = require("../middleware/middleware");

connectToMongoDB();
router.use(fileUpload());

router.post("/upload", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files uploaded");
    }
    const excel = req.files.file;
    const workbook = XLSX.read(excel.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const newData = XLSX.utils.sheet_to_json(sheet);

    await Timetable.deleteMany();

    const newTimetable = await Timetable.create(newData);
    console.log("Timetable uploaded: ", newTimetable);
    return res.status(201).json({ message: "table Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
