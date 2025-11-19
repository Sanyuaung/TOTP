import { NextRequest, NextResponse } from "next/server";
import { TwoFactorService } from "@/lib/two-factor";
import { AuthUtils } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = AuthUtils.verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const result = await TwoFactorService.disableTwoFactor(
      decoded.sub,
      password
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Disable 2FA error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}
