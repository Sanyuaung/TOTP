import { Center, Loader } from "@mantine/core";

interface LoadingCenterProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullHeight?: boolean;
}

export function LoadingCenter({
  size = "lg",
  fullHeight = true,
}: LoadingCenterProps) {
  return (
    <Center h={fullHeight ? "100vh" : "auto"}>
      <Loader size={size} />
    </Center>
  );
}
