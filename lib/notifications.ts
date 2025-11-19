import { notifications } from "@mantine/notifications";

type NotificationType = "success" | "error" | "info" | "warning";

export const showNotification = (
  title: string,
  message: string,
  type: NotificationType = "info"
) => {
  const colorMap: Record<NotificationType, string> = {
    success: "green",
    error: "red",
    info: "blue",
    warning: "yellow",
  };

  notifications.show({
    title,
    message,
    color: colorMap[type],
  });
};

export const notificationMessages = {
  loginSuccess: () =>
    showNotification("Success", "Logged in successfully", "success"),
  loginFailed: (message?: string) =>
    showNotification("Login Failed", message || "Invalid credentials", "error"),
  registrationSuccess: () =>
    showNotification(
      "Success",
      "Account created successfully! Please log in.",
      "success"
    ),
  registrationFailed: (message?: string) =>
    showNotification(
      "Registration Failed",
      message || "Registration failed",
      "error"
    ),
  passwordMismatch: () =>
    showNotification("Error", "Passwords do not match", "error"),
  passwordTooShort: () =>
    showNotification(
      "Error",
      "Password must be at least 6 characters",
      "error"
    ),
  networkError: () =>
    showNotification("Error", "Network error. Please try again.", "error"),
  logoutSuccess: () =>
    showNotification("Success", "Logged out successfully", "success"),
  twoFactorRequired: (method: string) =>
    showNotification(
      "2FA Required",
      `Please enter your ${
        method === "EMAIL" ? "email" : "authenticator"
      } code`,
      "info"
    ),
  verificationFailed: (message?: string) =>
    showNotification("Verification Failed", message || "Invalid code", "error"),
};
