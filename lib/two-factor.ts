import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { prisma } from "./prisma";
import { emailService } from "./email";

export class TwoFactorService {
  static async enableTwoFactor(
    userId: string,
    method: "EMAIL" | "GOOGLE_AUTH"
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { twoFactorAuth: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (method === "GOOGLE_AUTH") {
      // Generate secret for Google Authenticator
      const secret = speakeasy.generateSecret({
        name: `TOTP Auth (${user.email})`,
      });

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      // Create or update two-factor auth record
      const twoFactorAuth = await prisma.twoFactorAuth.upsert({
        where: { userId },
        create: {
          userId,
          method: "GOOGLE_AUTH",
          secret: secret.base32,
          backupCodes,
          isEnabled: false, // Not enabled until verified
        },
        update: {
          method: "GOOGLE_AUTH",
          secret: secret.base32,
          backupCodes,
          isEnabled: false,
        },
      });

      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

      return {
        secret: secret.base32,
        qrCode: qrCodeUrl,
        backupCodes,
        method: "GOOGLE_AUTH",
      };
    } else {
      // EMAIL method
      await prisma.twoFactorAuth.upsert({
        where: { userId },
        create: {
          userId,
          method: "EMAIL",
          isEnabled: false,
        },
        update: {
          method: "EMAIL",
          isEnabled: false,
        },
      });

      // Send test OTP
      const otp = this.generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await prisma.twoFactorAuth.update({
        where: { userId },
        data: {
          emailOtp: otp,
          emailOtpExpiry: otpExpiry,
        },
      });

      await emailService.sendOtpEmail(user.email, otp);

      return {
        method: "EMAIL",
        message: "OTP sent to your email. Please verify to enable 2FA.",
      };
    }
  }

  static async verifyAndEnable(userId: string, code: string) {
    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!twoFactorAuth) {
      throw new Error("Two-factor authentication not set up");
    }

    let isValid = false;

    if (twoFactorAuth.method === "GOOGLE_AUTH") {
      // Verify TOTP code
      isValid = speakeasy.totp.verify({
        secret: twoFactorAuth.secret!,
        encoding: "base32",
        token: code,
        window: 6, // 3 minutes tolerance
      });
    } else {
      // Verify email OTP
      if (!twoFactorAuth.emailOtp || !twoFactorAuth.emailOtpExpiry) {
        throw new Error("No OTP sent");
      }

      if (new Date() > twoFactorAuth.emailOtpExpiry) {
        throw new Error("OTP expired");
      }

      isValid = twoFactorAuth.emailOtp === code;
    }

    if (!isValid) {
      throw new Error("Invalid code");
    }

    // Enable 2FA
    await prisma.twoFactorAuth.update({
      where: { userId },
      data: {
        isEnabled: true,
        emailOtp: null,
        emailOtpExpiry: null,
      },
    });

    return {
      message: "Two-factor authentication enabled successfully",
    };
  }

  static async verifyLogin(tempToken: string, code: string) {
    const { AuthUtils } = await import("./auth");
    const decoded = AuthUtils.decodeToken(tempToken);

    if (!decoded || !decoded.requiresOtp) {
      throw new Error("Invalid token");
    }

    const userId = decoded.sub;

    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!twoFactorAuth || !twoFactorAuth.isEnabled) {
      throw new Error("Two-factor authentication not enabled");
    }

    let isValid = false;

    if (twoFactorAuth.method === "GOOGLE_AUTH") {
      // Verify TOTP code or backup code
      isValid = speakeasy.totp.verify({
        secret: twoFactorAuth.secret!,
        encoding: "base32",
        token: code,
        window: 6, // 3 minutes tolerance
      });

      if (!isValid && twoFactorAuth.backupCodes.includes(code)) {
        isValid = true;
        // Remove used backup code
        await prisma.twoFactorAuth.update({
          where: { userId },
          data: {
            backupCodes: twoFactorAuth.backupCodes.filter((bc) => bc !== code),
          },
        });
      }
    } else {
      // For email method, send OTP first if not exists
      if (
        !twoFactorAuth.emailOtp ||
        !twoFactorAuth.emailOtpExpiry ||
        new Date() > twoFactorAuth.emailOtpExpiry
      ) {
        const otp = this.generateOtp();
        const otpExpiry = new Date(Date.now() + 30 * 1000); // 30 seconds

        await prisma.twoFactorAuth.update({
          where: { userId },
          data: {
            emailOtp: otp,
            emailOtpExpiry: otpExpiry,
          },
        });

        await emailService.sendOtpEmail(twoFactorAuth.user.email, otp);
        throw new Error("OTP sent to your email");
      }

      isValid = twoFactorAuth.emailOtp === code;
    }

    if (!isValid) {
      throw new Error("Invalid code");
    }

    // Clear email OTP after successful verification
    if (twoFactorAuth.method === "EMAIL") {
      await prisma.twoFactorAuth.update({
        where: { userId },
        data: {
          emailOtp: null,
          emailOtpExpiry: null,
        },
      });
    }

    // Generate full access token
    const accessToken = AuthUtils.generateAccessToken({
      sub: twoFactorAuth.user.id,
      email: twoFactorAuth.user.email,
      requiresOtp: false,
    });

    return {
      accessToken,
      user: {
        id: twoFactorAuth.user.id,
        email: twoFactorAuth.user.email,
        name: twoFactorAuth.user.name,
      },
    };
  }

  static async getTwoFactorStatus(userId: string) {
    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId },
    });

    if (!twoFactorAuth) {
      return {
        isEnabled: false,
        method: null,
      };
    }

    return {
      isEnabled: twoFactorAuth.isEnabled,
      method: twoFactorAuth.method,
    };
  }

  static async sendEmailOtp(userId: string) {
    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!twoFactorAuth || twoFactorAuth.method !== "EMAIL") {
      throw new Error("Email 2FA not configured");
    }

    const otp = this.generateOtp();
    const otpExpiry = new Date(Date.now() + 60 * 1000); // 60 seconds

    await prisma.twoFactorAuth.update({
      where: { userId },
      data: {
        emailOtp: otp,
        emailOtpExpiry: otpExpiry,
      },
    });

    await emailService.sendOtpEmail(twoFactorAuth.user.email, otp);

    return {
      message: "OTP sent to your email",
    };
  }

  static async disableTwoFactor(userId: string, password: string) {
    const { AuthUtils } = await import("./auth");

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isPasswordValid = await AuthUtils.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    await prisma.twoFactorAuth.delete({
      where: { userId },
    });

    return {
      message: "Two-factor authentication disabled successfully",
    };
  }

  static async requestEmailOtpByTempToken(tempToken: string) {
    const { AuthUtils } = await import("./auth");
    const decoded = AuthUtils.decodeToken(tempToken);

    if (!decoded || !decoded.requiresOtp) {
      throw new Error("Invalid token");
    }

    const userId = decoded.sub;
    return this.sendEmailOtp(userId);
  }

  static async requestEmailOtpByJwt(userId: string) {
    return this.sendEmailOtp(userId);
  }

  private static generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private static generateBackupCodes(): string[] {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    return codes;
  }
}
