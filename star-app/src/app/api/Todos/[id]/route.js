import { NextResponse } from "next/server";
import Todo from "../../../../../(models)/Todo";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTask = await Todo.findOne({ _id: id });
    return NextResponse.json(
      { message: "Found Task", foundTask },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const todoData = body.formData;
    const updateTaskData = await Todo.findByIdAndUpdate(id, {
      ...todoData,
    });

    console.log("Update RAN", todoData);
    return NextResponse.json({ message: "Task Update" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}
