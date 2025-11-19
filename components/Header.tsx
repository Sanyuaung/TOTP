"use client";

import {
  Group,
  Button,
  ActionIcon,
  Title,
  Text,
  Avatar,
  Menu,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { getAvatarColors } from "@/lib/avatar-colors";
import {
  IconLogout,
  IconUser,
  IconSettings,
  IconDashboard,
  IconChevronDown,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface HeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  title?: string;
  subtitle?: string;
}

export function Header({
  showBackButton = false,
  backTo,
  title,
  subtitle,
}: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    notifications.show({
      title: "Success",
      message: "Logged out successfully",
      color: "green",
    });
    router.push("/login");
  };

  const userDisplayName = user?.name || user?.email || "User";
  const avatarColors = getAvatarColors(userDisplayName);

  const handleBack = () => {
    if (backTo) {
      router.push(backTo);
    } else {
      router.back();
    }
  };

  return (
    <Group justify="space-between" mb="xl">
      <Group>
        {showBackButton && (
          <Button
            variant="subtle"
            leftSection={
              <IconChevronDown
                size={16}
                style={{ transform: "rotate(90deg)" }}
              />
            }
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <div>
          {title && (
            <Title size="h1" fw={700} c="blue">
              {title}
            </Title>
          )}
          {subtitle && (
            <Text c="dimmed" mt={4}>
              {subtitle}
            </Text>
          )}
        </div>
      </Group>

      <Group>
        <DarkModeToggle />

        {user && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="subtle"
                leftSection={
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      userDisplayName
                    )}&size=32&background=${avatarColors.bg}&color=${
                      avatarColors.text
                    }&rounded=true&bold=true&uppercase=true`}
                    alt={`${userDisplayName} avatar`}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--mantine-color-default-border)",
                    }}
                  />
                }
                rightSection={<IconChevronDown size={14} />}
              >
                {user.name || user.email}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconDashboard size={14} />}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                leftSection={<IconUser size={14} />}
                onClick={() => router.push("/profile")}
              >
                Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout size={14} />}
                color="red"
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
}
