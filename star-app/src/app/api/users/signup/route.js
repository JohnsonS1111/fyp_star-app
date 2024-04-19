import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Jwt } from "jsonwebtoken"; // Import corrected

export async function POST(req) {
  try {
    console.log("POST RAN");
    const reqBody = await req.body;
    const { username, email, password } = reqBody;

    // check if user exists
    const userCheckResponse = await fetch(
      "http://localhost:5000/signup/checkUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    ); // Await the result

    const userCheck = await userCheckResponse.json();
    if (userCheck.error) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(res.ok){
      return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
    }else{
      return NextResponse.json(
        { message: "User cannot be created" },
        { status: 400 }
      );
    }
    
  } catch (error) {
    return NextResponse.json(
      { message: "POST error: " + error }, // Concatenate error message
      { status: 500 }
    );
  }
}
