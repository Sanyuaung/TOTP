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
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Header } from "@/components/Header";
import {
  IconUserPlus,
  IconMail,
  IconLock,
  IconUser,
  IconLogin,
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

    if (password !== confirmPassword) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match",
        color: "red",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      notifications.show({
        title: "Error",
        message: "Password must be at least 6 characters",
        color: "red",
      });
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
        notifications.show({
          title: "Success",
          message: "Account created successfully! Please log in.",
          color: "green",
        });
        router.push("/login");
      } else {
        notifications.show({
          title: "Registration Failed",
          message: data.error || "Registration failed",
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

  return (
    <Container size={480} py={40}>
      <Header />

      <Stack align="center" mb="xl">
        <ThemeIcon size="xl" radius="xl" variant="light" color="green">
          <IconUserPlus size={28} />
        </ThemeIcon>
        <div style={{ textAlign: "center" }}>
          <Title size="h2" fw={700} c="green">
            Create Account
          </Title>
          <Text c="dimmed" mt={4}>
            Join us and secure your account
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
      </Paper>
    </Container>
  );
}
