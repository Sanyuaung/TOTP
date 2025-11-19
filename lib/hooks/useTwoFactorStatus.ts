import { useState, useEffect, useCallback } from "react";

interface TwoFactorStatus {
  isEnabled: boolean;
  method: string | null;
}

export function useTwoFactorStatus() {
  const [status, setStatus] = useState<TwoFactorStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/two-factor/status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, loading, error, refetch: fetchStatus };
}
