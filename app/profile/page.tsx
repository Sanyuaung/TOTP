"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Text,
  Modal,
  Image,
  Code,
  Divider,
  Badge,
  Tabs,
  Loader,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Header } from "@/components/Header";
import { showNotification } from "@/lib/notifications";
import { useTwoFactorStatus } from "@/lib/hooks";
import {
  IconUser,
  IconLock,
  IconShield,
  IconMail,
  IconKey,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

// Create a wrapper component that uses useSearchParams
function ProfileContent() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "manage-profile";
  const [loading, setLoading] = useState(false);
  const { status: twoFactorStatus, refetch } = useTwoFactorStatus();
  const [setupModal, setSetupModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verifyCode, setVerifyCode] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"EMAIL" | "GOOGLE_AUTH">(
    "EMAIL"
  );
  const [disableModal, setDisableModal] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");

  const profileForm = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });

  const passwordForm = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      newPassword: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        profileForm.setValues({
          name: data.user.name || "",
          email: data.user.email || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile");
    }
  };

  const handleUpdateProfile = async (values: typeof profileForm.values) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        showNotification("Success", "Profile updated successfully", "success");
      } else {
        const data = await response.json();
        showNotification(
          "Error",
          data.error || "Failed to update profile",
          "error"
        );
      }
    } catch (error: any) {
      showNotification("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: typeof passwordForm.values) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      if (response.ok) {
        showNotification("Success", "Password changed successfully", "success");
        passwordForm.reset();
      } else {
        const data = await response.json();
        showNotification(
          "Error",
          data.error || "Failed to change password",
          "error"
        );
      }
    } catch (error: any) {
      showNotification("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("/api/two-factor/enable", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ method: selectedMethod }),
      });

      const data = await response.json();

      if (response.ok) {
        if (selectedMethod === "GOOGLE_AUTH") {
          setQrCode(data.qrCode);
          setSecret(data.secret);
          setBackupCodes(data.backupCodes);
        }

        setSetupModal(true);
        const message =
          selectedMethod === "EMAIL"
            ? "OTP sent to your email. Please verify to enable 2FA."
            : "Scan the QR code with your authenticator app";
        showNotification("Success", message, "info");
      } else {
        showNotification(
          "Error",
          data.error || "Failed to enable 2FA",
          "error"
        );
      }
    } catch (error: any) {
      showNotification("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("/api/two-factor/verify-enable", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verifyCode }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(
          "Success",
          "Two-factor authentication enabled successfully",
          "success"
        );
        setSetupModal(false);
        setVerifyCode("");
        refetch();
      } else {
        showNotification("Error", data.error || "Invalid code", "error");
      }
    } catch (error: any) {
      showNotification("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setDisableModal(true);
  };

  const handleConfirmDisable2FA = async () => {
    if (!disablePassword) return;

    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("/api/two-factor/disable", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: disablePassword }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(
          "Success",
          "Two-factor authentication disabled",
          "success"
        );
        setDisableModal(false);
        setDisablePassword("");
        refetch();
      } else {
        showNotification(
          "Error",
          data.error || "Failed to disable 2FA",
          "error"
        );
      }
    } catch (error: any) {
      showNotification("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={800} py={40}>
      <Header
        showBackButton={true}
        backTo="/dashboard"
        title="Profile Settings"
        subtitle="Manage your account and security preferences"
      />

      <Tabs defaultValue={tab} orientation="vertical">
        <Tabs.List style={{ width: "200px" }}>
          <Tabs.Tab value="manage-profile" leftSection={<IconUser size={18} />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab
            value="security-settings"
            leftSection={<IconShield size={18} />}
          >
            Security
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="manage-profile" pl="xl">
          <Stack gap="lg">
            <Paper
              shadow="lg"
              p={30}
              radius="lg"
              style={{
                background: "var(--mantine-color-default)",
                border: "1px solid var(--mantine-color-default-border)",
              }}
            >
              <Group mb="lg">
                <IconUser size={24} color="#2196F3" />
                <Title order={3} fw={600}>
                  Update Profile Information
                </Title>
              </Group>
              <form onSubmit={profileForm.onSubmit(handleUpdateProfile)}>
                <Stack gap="md">
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    leftSection={<IconUser size={16} />}
                    size="md"
                    {...profileForm.getInputProps("name")}
                  />
                  <TextInput
                    label="Email Address"
                    placeholder="your@email.com"
                    leftSection={<IconMail size={16} />}
                    size="md"
                    {...profileForm.getInputProps("email")}
                  />
                  <Button
                    type="submit"
                    loading={loading}
                    size="md"
                    leftSection={<IconCheck size={16} />}
                    variant="filled"
                    color="green"
                  >
                    Update Profile
                  </Button>
                </Stack>
              </form>
            </Paper>

            <Paper
              shadow="lg"
              p={30}
              radius="lg"
              style={{
                background: "var(--mantine-color-default)",
                border: "1px solid var(--mantine-color-default-border)",
              }}
            >
              <Group mb="lg">
                <IconKey size={24} color="#FF9800" />
                <Title order={3} fw={600}>
                  Change Password
                </Title>
              </Group>
              <form onSubmit={passwordForm.onSubmit(handleChangePassword)}>
                <Stack gap="md">
                  <PasswordInput
                    label="Current Password"
                    placeholder="Enter current password"
                    leftSection={<IconLock size={16} />}
                    size="md"
                    {...passwordForm.getInputProps("currentPassword")}
                  />
                  <PasswordInput
                    label="New Password"
                    placeholder="Enter new password"
                    leftSection={<IconLock size={16} />}
                    size="md"
                    {...passwordForm.getInputProps("newPassword")}
                  />
                  <PasswordInput
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    leftSection={<IconLock size={16} />}
                    size="md"
                    {...passwordForm.getInputProps("confirmPassword")}
                  />
                  <Button
                    type="submit"
                    loading={loading}
                    size="md"
                    leftSection={<IconKey size={16} />}
                    variant="filled"
                    color="orange"
                  >
                    Change Password
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="security-settings" pl="xl">
          <Stack gap="lg">
            <Paper
              shadow="lg"
              p={30}
              radius="lg"
              style={{
                background: "var(--mantine-color-default)",
                border: "1px solid var(--mantine-color-default-border)",
              }}
            >
              <Group justify="space-between" mb="lg">
                <Group>
                  <IconShield size={24} color="#2196F3" />
                  <div>
                    <Title order={3} fw={600}>
                      Two-Factor Authentication
                    </Title>
                    <Text c="dimmed" size="sm">
                      Add an extra layer of security to your account
                    </Text>
                  </div>
                </Group>
                {twoFactorStatus?.isEnabled && (
                  <Badge
                    color="green"
                    size="lg"
                    leftSection={<IconCheck size={14} />}
                  >
                    Enabled
                  </Badge>
                )}
              </Group>

              {twoFactorStatus?.isEnabled ? (
                <>
                  <Text size="sm" mb="lg">
                    Method:{" "}
                    <Badge variant="light" size="md">
                      {twoFactorStatus.method === "EMAIL"
                        ? "Email Authentication"
                        : "Google Authenticator"}
                    </Badge>
                  </Text>
                  <Button
                    color="red"
                    onClick={handleDisable2FA}
                    loading={loading}
                    size="md"
                    leftSection={<IconX size={16} />}
                    variant="filled"
                  >
                    Disable 2FA
                  </Button>
                </>
              ) : (
                <Stack gap="md">
                  <Text size="sm" fw={500}>
                    Choose your 2FA method:
                  </Text>
                  <Group>
                    <Button
                      variant={selectedMethod === "EMAIL" ? "filled" : "light"}
                      onClick={() => setSelectedMethod("EMAIL")}
                      size="md"
                      leftSection={<IconMail size={16} />}
                      color={selectedMethod === "EMAIL" ? "blue" : "gray"}
                    >
                      Email
                    </Button>
                    <Button
                      variant={
                        selectedMethod === "GOOGLE_AUTH" ? "filled" : "light"
                      }
                      onClick={() => setSelectedMethod("GOOGLE_AUTH")}
                      size="md"
                      leftSection={<IconShield size={16} />}
                      color={selectedMethod === "GOOGLE_AUTH" ? "blue" : "gray"}
                    >
                      Google Authenticator
                    </Button>
                  </Group>
                  <Button
                    onClick={handleEnable2FA}
                    loading={loading}
                    size="md"
                    leftSection={<IconShield size={16} />}
                    variant="filled"
                  >
                    Enable 2FA
                  </Button>
                </Stack>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      <Modal
        opened={setupModal}
        onClose={() => setSetupModal(false)}
        title={
          <Group>
            <IconShield size={20} />
            <Text fw={600}>Setup Two-Factor Authentication</Text>
          </Group>
        }
        size="lg"
        centered
      >
        <Stack gap="lg">
          {selectedMethod === "GOOGLE_AUTH" && qrCode && (
            <>
              <Text size="sm" fw={500}>
                1. Scan this QR code with your authenticator app:
              </Text>
              <Group justify="center">
                <Image src={qrCode} alt="QR Code" maw={200} />
              </Group>

              <Divider label="OR" labelPosition="center" />

              <Text size="sm" fw={500}>
                Enter this code manually:
              </Text>
              <Code block style={{ fontSize: "14px", padding: "12px" }}>
                {secret}
              </Code>

              {backupCodes.length > 0 && (
                <>
                  <Divider />
                  <Text size="sm" fw={500} c="orange">
                    Save these backup codes in a safe place:
                  </Text>
                  <Paper
                    p="md"
                    withBorder
                    style={{ backgroundColor: "#fff3cd" }}
                  >
                    {backupCodes.map((code, index) => (
                      <Code key={index} block style={{ marginBottom: "4px" }}>
                        {code}
                      </Code>
                    ))}
                  </Paper>
                </>
              )}
            </>
          )}

          <Text size="sm" fw={500}>
            {selectedMethod === "GOOGLE_AUTH" ? "2. " : ""}Enter the 6-digit
            code to verify:
          </Text>
          <TextInput
            placeholder="Enter verification code"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            maxLength={6}
            size="md"
            leftSection={<IconShield size={16} />}
          />
          <Button
            onClick={handleVerify2FA}
            loading={loading}
            disabled={verifyCode.length !== 6}
            size="md"
            leftSection={<IconCheck size={16} />}
            style={{
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              border: "none",
            }}
          >
            Verify and Enable
          </Button>
        </Stack>
      </Modal>

      <Modal
        opened={disableModal}
        onClose={() => setDisableModal(false)}
        title={
          <Group>
            <Text fw={600}>Disable Two-Factor Authentication</Text>
          </Group>
        }
        size="md"
        centered
      >
        <Stack gap="lg">
          <Text size="sm" c="dimmed">
            To disable two-factor authentication, please enter your current
            password for security verification.
          </Text>

          <PasswordInput
            label="Current Password"
            placeholder="Enter your password"
            value={disablePassword}
            onChange={(e) => setDisablePassword(e.target.value)}
            leftSection={<IconLock size={16} />}
            size="md"
          />

          <Group justify="flex-end" gap="md">
            <Button
              variant="light"
              onClick={() => {
                setDisableModal(false);
                setDisablePassword("");
              }}
              size="md"
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleConfirmDisable2FA}
              loading={loading}
              disabled={!disablePassword}
              size="md"
              leftSection={<IconX size={16} />}
              style={{
                background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                border: "none",
              }}
            >
              Disable 2FA
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

// Loading component for Suspense fallback
function ProfileLoading() {
  return (
    <Container size={800} py={40}>
      <Header
        showBackButton={true}
        backTo="/dashboard"
        title="Profile Settings"
        subtitle="Manage your account and security preferences"
      />
      <Center style={{ height: "400px" }}>
        <Loader size="lg" />
      </Center>
    </Container>
  );
}

// Main component with Suspense boundary
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}