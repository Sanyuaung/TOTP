"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  tempToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<any>;
  setTempToken: (token: string | null) => void;
  setAuthData: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (storedToken) {
        try {
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem("accessToken");
            setToken(null);
          }
        } catch (error) {
          localStorage.removeItem("accessToken");
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    if (data.requiresOtp) {
      setTempToken(data.tempToken);
      return data;
    }

    const { accessToken, user: userData } = data;
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    setUser(userData);
    return data;
  };

  const register = async (email: string, password: string, name?: string) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout API error:", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("tempToken");
    localStorage.removeItem("otpMethod");
    setToken(null);
    setUser(null);
    setTempToken(null);
  };

  const setAuthData = (newToken: string, newUser: User) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    setUser(newUser);
    setTempToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        tempToken,
        loading,
        login,
        logout,
        register,
        setTempToken,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
