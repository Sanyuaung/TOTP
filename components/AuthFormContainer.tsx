import { Container, Paper, Stack, Title, Text } from "@mantine/core";
import { ReactNode } from "react";

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  size?: number;
}

export function AuthFormContainer({
  title,
  subtitle,
  children,
  size = 420,
}: AuthFormContainerProps) {
  return (
    <Container size={size} py={40}>
      <Stack align="center" mb="xl">
        <div style={{ textAlign: "center" }}>
          <Title size="h2" fw={700} c="blue">
            {title}
          </Title>
          <Text c="dimmed" mt={4}>
            {subtitle}
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
        {children}
      </Paper>
    </Container>
  );
}
