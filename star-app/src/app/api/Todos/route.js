import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("POST RAN");
    const reqbody = await req.json();
    const todoData = reqbody.formData;

    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqbody),
    });
    if (!res.ok) {
      return NextResponse.json({
        message: "task could not be created",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "task successfully created",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const reqbody = await req.body;
    const res = await fetch("http://localhost:5000/todos/displayTodos", {
      method: "GET",
      body: JSON.stringify(reqbody),
    });
    if (!res.ok) {
      return NextResponse.json({
        message: "unable to find tasks",
        status: 400,
      });
    }
    return NextResponse.json({ reqbody });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
