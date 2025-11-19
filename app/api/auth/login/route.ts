import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthUtils } from "@/lib/auth";
import { TwoFactorService } from "@/lib/two-factor";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        twoFactorAuth: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await AuthUtils.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if 2FA is enabled
    if (user.twoFactorAuth?.isEnabled) {
      // Automatically send email OTP if email method is enabled
      if (user.twoFactorAuth.method === "EMAIL") {
        await TwoFactorService.sendEmailOtp(user.id);
      }

      // Return temporary token that requires OTP verification
      const tempToken = AuthUtils.generateTempToken({
        sub: user.id,
        email: user.email,
        requiresOtp: true,
      });

      return NextResponse.json({
        requiresOtp: true,
        tempToken,
        method: user.twoFactorAuth.method,
      });
    }

    // Generate access token
    const accessToken = AuthUtils.generateAccessToken({
      sub: user.id,
      email: user.email,
      requiresOtp: false,
    });

    // Create response with cookie
    const response = NextResponse.json({
      accessToken,
      requiresOtp: false,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    // Set httpOnly cookie for middleware
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
