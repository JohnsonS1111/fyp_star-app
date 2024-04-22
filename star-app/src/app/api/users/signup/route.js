import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Jwt } from "jsonwebtoken"; // Import corrected

export async function POST(req) {
  try {

    const { username, email, password } = await req.json();

    console.log("********************");

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

    const userCheck = userCheckResponse.json(); //await
    if (userCheck.error) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
        console.log("failed"),
      );
    }

    console.log("passed");
    // hash password
    const hashedPassword = bcryptjs.hash(password, 10);

    console.log("pass works");

  

    console.log(email);
    console.log(username);

    // Create user
    const res = await fetch("http://localhost:5000/signup/", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const userCreated = await res.json();

    console.log("Name: ", username )
    console.log("~~~~~~~~~~~~~~~" )
    console.log( userCreated)

    

    if(userCreated.errors = 0){
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
