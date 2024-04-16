import Timetable from "@/models/Timetable";
import { NextResponse } from "next/server";

export async function saveToDb(req) {
  console.log("POST RAN");
  try {
    const Timetable = new Timetable({
      timetableData: timetableData,
    });
    await Timetable.save()
    return NextResponse.json(
      { message: "Timetable saved to databse " },
      { status: 200 }
    );
    await deletePreviousTable()
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}

async function deletePreviousTable() {
    await Timetable.deleteMany({});
    console.log("Deleted previous table from database")
}