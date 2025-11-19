"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Stack,
  Group,
  ThemeIcon,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/Header";
import {
  IconLogin,
  IconMail,
  IconLock,
  IconUserPlus,
} from "@tabler/icons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.requiresOtp) {
        // Store temp token and redirect to OTP page
        localStorage.setItem("tempToken", result.tempToken);
        localStorage.setItem("otpMethod", result.method);
        notifications.show({
          title: "2FA Required",
          message: `Please enter your ${
            result.method === "EMAIL" ? "email" : "authenticator"
          } code`,
          color: "blue",
        });
        router.push("/otp");
      } else {
        notifications.show({
          title: "Success",
          message: "Logged in successfully",
          color: "green",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      notifications.show({
        title: "Login Failed",
        message: error.message || "Invalid credentials",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} py={40}>
      <Header />

      <Stack align="center" mb="xl">
        <div style={{ textAlign: "center" }}>
          <Title size="h2" fw={700} c="blue">
            Welcome Back
          </Title>
          <Text c="dimmed" mt={4}>
            Sign in to your secure account
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
        <form onSubmit={handleSubmit}>
          <Stack gap="lg">
            <TextInput
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              leftSection={<IconMail size={16} />}
              size="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              leftSection={<IconLock size={16} />}
              size="md"
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="md"
              leftSection={<IconLogin size={16} />}
              variant="filled"
            >
              Sign In
            </Button>
          </Stack>
        </form>

        <Group justify="center" mt="xl">
          <Text size="sm" c="dimmed">
            Don't have an account?{" "}
            <Anchor
              href="/register"
              fw={600}
              c="blue"
              style={{ textDecoration: "none" }}
            >
              Create one here
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}
