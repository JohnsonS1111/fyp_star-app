import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"; // Fix typo

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    // Confirm Data Exists
    if (!userData?.email || !userData?.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Ensure no emails are duplicated
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      // Check if duplicate exists before accessing its properties
      return NextResponse.json(
        { message: "Duplicate Email." },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
