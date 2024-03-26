import Todo from "../(models)/Todo";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
      const body = await req.json()
      const todoData = body.formData;
      await Todo.create(todoData)  

      return NextResponse.json({message: "Task Created"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}