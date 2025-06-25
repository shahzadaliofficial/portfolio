import { useState, useEffect, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";
import { AuthContext } from "@/context/AuthProvider";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setIsAuthenticated(false);
        setUsername(null);
        return;
      }

      const response = await apiRequest("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAuthenticated(true);
      setUsername(response.username);
    } catch (error) {
      localStorage.removeItem("admin_token");
      setIsAuthenticated(false);
      setUsername(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("admin_token", response.token);
      setIsAuthenticated(true);
      setUsername(response.username);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setUsername(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    username,
    login,
    logout,
    checkAuth,
  };
}