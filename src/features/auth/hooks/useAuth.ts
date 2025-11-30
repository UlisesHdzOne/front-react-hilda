import { useState } from "react";
import { authService } from "../api/auth.service";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../api/auth.types";

type ApiError = {
  response?: { data?: { message?: string } };
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;

    const apiErr = err as ApiError;
    return apiErr.response?.data?.message || "Error inesperado";
  };

  const login = async (data: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authService.login(data);
      localStorage.setItem("access_token", res.access_token);
      setUser(res.user);
    } catch (err: unknown) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authService.register(data);
      localStorage.setItem("access_token", res.access_token);
      setUser(res.user);
    } catch (err: unknown) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
};
