import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const timeTableSchema = new Schema(
  {
    timetableData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Timetable = mongoose.models.Timetable || mongoose.model("Timetable", timeTableSchema);
export default Timetable;
