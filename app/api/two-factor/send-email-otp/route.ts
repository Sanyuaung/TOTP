import { NextRequest, NextResponse } from "next/server";
import { TwoFactorService } from "@/lib/two-factor";
import { AuthUtils } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { tempToken } = await request.json();

    if (tempToken) {
      // During login flow, use tempToken
      const result = await TwoFactorService.requestEmailOtpByTempToken(
        tempToken
      );
      return NextResponse.json(result);
    } else {
      // After login, use JWT from authorization header
      const authHeader = request.headers.get("authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.substring(7);
      const decoded = AuthUtils.verifyToken(token);

      if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      const result = await TwoFactorService.requestEmailOtpByJwt(decoded.sub);
      return NextResponse.json(result);
    }
  } catch (error: any) {
    console.error("Request OTP error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}
