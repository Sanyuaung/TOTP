"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Stack,
  Group,
  ThemeIcon,
} from "@mantine/core";
import { Header } from "@/components/Header";
import { AuthFormContainer } from "@/components/AuthFormContainer";
import { showNotification, notificationMessages } from "@/lib/notifications";
import { validatePassword, validatePasswordMatch } from "@/lib/hooks";
import {
  IconUserPlus,
  IconMail,
  IconLock,
  IconUser,
} from "@tabler/icons-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const passwordMatchError = validatePasswordMatch(password, confirmPassword);
    if (passwordMatchError) {
      showNotification("Error", passwordMatchError, "error");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showNotification("Error", passwordError, "error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        notificationMessages.registrationSuccess();
        router.push("/login");
      } else {
        notificationMessages.registrationFailed(data.error);
      }
    } catch {
      notificationMessages.networkError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuthFormContainer
        title="Create Account"
        subtitle="Join us and secure your account"
        size={480}
      >
        <Stack align="center" mb="lg">
          <ThemeIcon size="xl" radius="xl" variant="light" color="green">
            <IconUserPlus size={28} />
          </ThemeIcon>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap="lg">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftSection={<IconUser size={16} />}
              size="md"
            />

            <TextInput
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftSection={<IconMail size={16} />}
              size="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              leftSection={<IconLock size={16} />}
              size="md"
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              leftSection={<IconLock size={16} />}
              size="md"
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="md"
              leftSection={<IconUserPlus size={16} />}
              variant="filled"
              color="green"
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Group justify="center" mt="xl">
          <Text size="sm" c="dimmed">
            Already have an account?{" "}
            <Anchor
              href="/login"
              fw={600}
              c="blue"
              style={{ textDecoration: "none" }}
            >
              Sign in here
            </Anchor>
          </Text>
        </Group>
      </AuthFormContainer>
    </>
  );
}
