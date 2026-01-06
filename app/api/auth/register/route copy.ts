// app/api/register/route.ts (or pages/api/register.ts)
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";
import { AuthUtils } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 1. Validate the email with Gamalogic
    const apiKey = process.env.GAMALOGIC_API_KEY;
    const url = "https://gamalogic.com/emailvrf";
    const params = {
      emailid: email,
      apikey: apiKey,
      speed_rank: 0, // optional
    };

    const validationRes = await axios.get(url, { params });
    const validationData = validationRes.data;
    // The API returns an object like { gamalogic_emailid_vrfy: [ { ... } ] }
    const result = validationData.gamalogic_emailid_vrfy?.[0];

    if (!result) {
      return NextResponse.json(
        { error: "Could not validate email" },
        { status: 400 }
      );
    }

    // Check the validation properties
    if (!result.is_syntax_valid) {
      return NextResponse.json(
        { error: "Email syntax is invalid" },
        { status: 400 }
      );
    }
    if (result.is_disposable) {
      return NextResponse.json(
        { error: "Disposable / temporary email is not allowed" },
        { status: 400 }
      );
    }
    if (!result.is_valid) {
      // This means Gamalogic thinks it's not a valid deliverable email
      return NextResponse.json(
        { error: "Email is not valid or not deliverable" },
        { status: 400 }
      );
    }

    // 2. Now check in your database if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // 3. Hash the password
    const hashedPassword = await AuthUtils.hashPassword(password);

    // 4. Create the user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
