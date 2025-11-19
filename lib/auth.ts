import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Debug: Check if environment variables are loaded
console.log("JWT_SECRET available:", !!process.env.JWT_SECRET);
console.log(
  "JWT_SECRET value:",
  process.env.JWT_SECRET?.substring(0, 10) + "..."
);

// Temporary: Hardcode JWT_SECRET for testing
const JWT_SECRET = process.env.JWT_SECRET || "TOTP2025";

export interface JWTPayload {
  sub: string;
  email: string;
  requiresOtp?: boolean;
}

export class AuthUtils {
  static generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "7d",
    } as any);
  }

  static generateTempToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "10m",
    } as any);
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return null;
    }
  }

  static decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch {
      return null;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
