import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { firstName, lastName, email, password, userRole } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };

  try {
    await dbConnect();
    await User.create(newUser);
    // if ("email available") {
    //   return new NextResponse("User with this email already exist", {
    //     status: 201,
    //   });
    // }
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
