"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Stack,
  Group,
  Text,
} from "@mantine/core";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/Header";
import { AuthFormContainer } from "@/components/AuthFormContainer";
import { showNotification, notificationMessages } from "@/lib/notifications";
import { IconLogin, IconMail, IconLock } from "@tabler/icons-react";

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
        localStorage.setItem("tempToken", result.tempToken);
        localStorage.setItem("otpMethod", result.method);
        notificationMessages.twoFactorRequired(result.method);
        router.push("/otp");
      } else {
        notificationMessages.loginSuccess();
        router.push("/dashboard");
      }
    } catch (error: any) {
      notificationMessages.loginFailed(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuthFormContainer
        title="Welcome Back"
        subtitle="Sign in to your secure account"
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
      </AuthFormContainer>
    </>
  );
}
