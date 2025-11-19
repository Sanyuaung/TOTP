import { NextRequest, NextResponse } from "next/server";
import { TwoFactorService } from "@/lib/two-factor";

export async function POST(request: NextRequest) {
  try {
    const { tempToken, code } = await request.json();

    // Validate input
    if (!tempToken || !code) {
      return NextResponse.json(
        { error: "Temp token and code are required" },
        { status: 400 }
      );
    }

    const result = await TwoFactorService.verifyLogin(tempToken, code);

    // Create response with cookie
    const response = NextResponse.json(result);

    // Set httpOnly cookie for middleware
    response.cookies.set("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("OTP verification error:", error);

    if (error.message === "OTP sent to your email") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: error.message || "Invalid code" },
      { status: 400 }
    );
  }
}
