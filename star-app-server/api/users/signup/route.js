import { connectToMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Jwt } from "jsonwebtoken"; // Import corrected

connectToMongoDB();

export async function POST(req) {
  const { username, email, password } = req.body;
  console.log("POST RAN");

  try {
    // check if user exists
    const userCheck = await User.findOne({ email }); // Await the result
    if (userCheck) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = await User.create({ username, email, password: hashedPassword }); // Pass arguments as object
    console.log(newUser);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "POST error: " + error }, // Concatenate error message
      { status: 500 }
    );
  }
}
