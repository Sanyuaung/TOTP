import { useState, useCallback } from "react";

interface UseApiCallOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useApiCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const call = useCallback(
    async (url: string, options?: RequestInit & UseApiCallOptions) => {
      setLoading(true);
      setError(null);

      const { onSuccess, onError, ...fetchOptions } = options || {};

      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...((options?.headers as Record<string, string>) || {}),
          },
          ...fetchOptions,
        } as RequestInit);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "An error occurred");
        }

        onSuccess?.(data);
        return data;
      } catch (err: any) {
        setError(err);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { call, loading, error };
}
