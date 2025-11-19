"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Title,
  Text,
  PinInput,
  Button,
  Stack,
  Group,
  RingProgress,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/Header";
import {
  IconShieldCheck,
  IconMail,
  IconRefresh,
  IconArrowLeft,
} from "@tabler/icons-react";

export default function OtpPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();
  const { setAuthData } = useAuth();

  useEffect(() => {
    const tempToken = localStorage.getItem("tempToken");
    const otpMethod = localStorage.getItem("otpMethod");

    if (!tempToken) {
      router.push("/login");
      return;
    }

    setMethod(otpMethod || "EMAIL");
  }, [router]);

  // Countdown timer that counts down to 0 and stops
  useEffect(() => {
    if (countdown > 0 && !isExpired) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown, isExpired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tempToken = localStorage.getItem("tempToken");
    if (!tempToken) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tempToken, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthData(data.accessToken, data.user);
        localStorage.removeItem("tempToken");
        localStorage.removeItem("otpMethod");
        notifications.show({
          title: "Success",
          message: "Login successful!",
          color: "green",
        });
        router.push("/dashboard");
      } else {
        notifications.show({
          title: "Verification Failed",
          message: data.error || "Invalid code",
          color: "red",
        });
      }
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Network error. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);

    const tempToken = localStorage.getItem("tempToken");
    if (!tempToken) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/two-factor/send-email-otp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tempToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCountdown(30); // Reset to 30 seconds
        setIsExpired(false);
        setCode(""); // Clear the input
        notifications.show({
          title: "Success",
          message: "OTP sent to your email!",
          color: "green",
        });
      } else {
        notifications.show({
          title: "Failed to Resend",
          message: data.error || "Failed to resend OTP",
          color: "red",
        });
      }
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Network error. Please try again.",
        color: "red",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container size={480} py={40}>
      <Header showBackButton={true} backTo="/login" />

      <Stack align="center" mb="xl">
        <ThemeIcon size="xl" radius="xl" variant="light" color="blue">
          <IconShieldCheck size={28} />
        </ThemeIcon>
        <div style={{ textAlign: "center" }}>
          <Title size="h2" fw={700} c="blue">
            Two-Factor Authentication
          </Title>
          <Text c="dimmed" mt={4}>
            Verify your identity to continue
          </Text>
        </div>
      </Stack>

      <Paper
        shadow="lg"
        p={40}
        radius="lg"
        style={{
          background: "var(--mantine-color-default)",
          border: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <Stack align="center" gap="lg">
          <Text ta="center" c="dimmed" size="sm">
            Enter the 6-digit code from your{" "}
            {method === "EMAIL" ? "email" : "authenticator app"}
          </Text>

          <Center>
            {isExpired ? (
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "48px", color: "red" }}>⚠️</span>
                <Text c="red" fw={700} size="lg" mt="xs">
                  EXPIRED
                </Text>
              </div>
            ) : (
              <RingProgress
                size={80}
                thickness={8}
                sections={[
                  {
                    value: (countdown / 30) * 100,
                    color:
                      countdown > 15
                        ? "blue"
                        : countdown > 7
                        ? "orange"
                        : "red",
                  },
                ]}
                label={
                  <Text
                    c={
                      countdown > 15 ? "blue" : countdown > 7 ? "orange" : "red"
                    }
                    fw={700}
                    ta="center"
                    size="lg"
                  >
                    {countdown}
                  </Text>
                }
              />
            )}
          </Center>

          <Text ta="center" c="dimmed" size="xs">
            {isExpired
              ? "Code has expired. Please request a new one."
              : `Code expires in ${countdown} second${
                  countdown !== 1 ? "s" : ""
                }`}
          </Text>

          <Group justify="center">
            <PinInput
              length={6}
              size="lg"
              value={code}
              onChange={setCode}
              placeholder=""
              type="number"
              disabled={isExpired}
            />
          </Group>

          <Button
            onClick={handleSubmit}
            fullWidth
            loading={loading}
            disabled={code.length !== 6 || isExpired}
            size="md"
            leftSection={<IconShieldCheck size={16} />}
            variant="filled"
          >
            Verify Code
          </Button>

          {isExpired && (
            <Button
              variant="filled"
              color="orange"
              onClick={handleResendOtp}
              fullWidth
              loading={resendLoading}
              size="md"
              leftSection={<IconRefresh size={16} />}
            >
              Request New Code
            </Button>
          )}

          <Button
            variant="subtle"
            color="gray"
            onClick={() => router.push("/login")}
            fullWidth
            size="md"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
