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

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const result = await TwoFactorService.verifyAndEnable(decoded.sub, code);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Verify and enable 2FA error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}
