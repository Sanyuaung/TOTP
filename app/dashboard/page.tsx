"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Badge,
  Grid,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/Header";
import { LoadingCenter } from "@/components/LoadingCenter";
import { getAvatarColors } from "@/lib/avatar-colors";
import { useTwoFactorStatus } from "@/lib/hooks";
import {
  IconUser,
  IconShield,
  IconShieldCheck,
  IconMail,
  IconDeviceMobile,
  IconKey,
  IconLock,
} from "@tabler/icons-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, setAuthData } = useAuth();
  const {
    status: twoFactorStatus,
    loading,
    refetch: refetchTwoFactor,
  } = useTwoFactorStatus();

  const userDisplayName = user?.name || user?.email || "User";
  const avatarColors = getAvatarColors(userDisplayName);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAuthData(localStorage.getItem("accessToken") || "", data);
      }
    } catch (error) {
      console.error("Error fetching user data from dashboard:", error);
    }
  };

  if (loading) {
    return <LoadingCenter />;
  }

  return (
    <Container size="xl" py={40}>
      <Header
        title="Dashboard"
        subtitle="Welcome back to your secure account"
      />

      <Stack gap="xl">
        {/* Welcome Card */}
        <Card
          shadow="lg"
          padding="xl"
          radius="lg"
          style={{
            background: "var(--mantine-color-blue-filled)",
            color: "var(--mantine-color-white)",
          }}
        >
          <Group>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                userDisplayName
              )}&size=64&background=${avatarColors.bg}&color=${
                avatarColors.text
              }&rounded=true&bold=true&uppercase=true`}
              alt={`${userDisplayName} avatar`}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--mantine-color-white)",
              }}
            />
            <div>
              <Title size="h3" fw={600}>
                Welcome back, {user?.name || user?.email?.split("@")[0]}!
              </Title>
              <Text opacity={0.9}>{user?.email}</Text>
              <Group mt="xs">
                <Badge
                  variant="light"
                  color="green"
                  leftSection={<IconShieldCheck size={12} />}
                >
                  Account Active
                </Badge>
                {twoFactorStatus?.isEnabled && (
                  <Badge
                    variant="light"
                    color="grape"
                    leftSection={<IconShield size={12} />}
                  >
                    2FA Enabled
                  </Badge>
                )}
              </Group>
            </div>
          </Group>
        </Card>

        {/* Quick Actions Grid */}
        <div>
          <Title size="h3" mb="md" fw={600}>
            Quick Actions
          </Title>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Card
                shadow="md"
                padding="lg"
                radius="lg"
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/profile?tab=manage-profile")}
                className="hover:shadow-xl transition-shadow"
              >
                <Group>
                  <ThemeIcon size="xl" radius="xl" variant="light" color="blue">
                    <IconUser size={24} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="lg">
                      Manage Profile
                    </Text>
                    <Text size="sm" c="dimmed">
                      Update your personal information
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Card
                shadow="md"
                padding="lg"
                radius="lg"
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/profile?tab=security-settings")}
                className="hover:shadow-xl transition-shadow"
              >
                <Group>
                  <ThemeIcon
                    size="xl"
                    radius="xl"
                    variant="light"
                    color="green"
                  >
                    <IconShield size={24} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="lg">
                      Security Settings
                    </Text>
                    <Text size="sm" c="dimmed">
                      Configure two-factor authentication
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        </div>

        {/* Features Overview */}
        <Card shadow="md" padding="xl" radius="lg">
          <Title size="h4" mb="lg" fw={600}>
            Security Features
          </Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Stack align="center" gap="xs">
                <ThemeIcon size="lg" radius="xl" variant="light" color="blue">
                  <IconMail size={20} />
                </ThemeIcon>
                <Text fw={500} ta="center">
                  Email 2FA
                </Text>
                <Text size="xs" c="dimmed" ta="center">
                  Secure OTP via email
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Stack align="center" gap="xs">
                <ThemeIcon size="lg" radius="xl" variant="light" color="green">
                  <IconDeviceMobile size={20} />
                </ThemeIcon>
                <Text fw={500} ta="center">
                  Google Auth
                </Text>
                <Text size="xs" c="dimmed" ta="center">
                  TOTP authenticator apps
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Stack align="center" gap="xs">
                <ThemeIcon size="lg" radius="xl" variant="light" color="orange">
                  <IconKey size={20} />
                </ThemeIcon>
                <Text fw={500} ta="center">
                  Password
                </Text>
                <Text size="xs" c="dimmed" ta="center">
                  Secure password management
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Stack align="center" gap="xs">
                <ThemeIcon size="lg" radius="xl" variant="light" color="purple">
                  <IconLock size={20} />
                </ThemeIcon>
                <Text fw={500} ta="center">
                  Sessions
                </Text>
                <Text size="xs" c="dimmed" ta="center">
                  Secure session management
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>
    </Container>
  );
}
