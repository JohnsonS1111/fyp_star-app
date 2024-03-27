import Todo from "@/app/(models)/Todo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTodo = await Todo.findOne({ _id: id });
    return NextResponse.json({ foundTodo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Todo Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const todoData = body.formData;
    const updateTodo = await Todo.findByIdAndUpdate(id, {
      ...todoData,
    });
    console.log("PUT Ran", todoData);
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
