import { useState, useCallback } from "react";
import { authService } from "../../features/auth/api/auth.service";
import { authRepository } from "../utils/authRepository";
import { LoginCredentials, RegisterData, AuthState } from "../types/auth.types";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: authRepository.getUser(), // ✅ Carga inicial del repository
    isLoading: false,
    error: null,
  });

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await authService.login(credentials);

        authRepository.saveToken(result.access_token);
        authRepository.saveUser(result.user);

        setState({
          user: result.user,
          isLoading: false,
          error: null,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        setState({
          user: null,
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    []
  );

  const register = useCallback(
    async (userData: RegisterData): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await authService.register(userData);

        authRepository.saveToken(result.access_token);
        authRepository.saveUser(result.user);

        setState({
          user: result.user,
          isLoading: false,
          error: null,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        setState({
          user: null,
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    []
  );

  const logout = useCallback((): void => {
    authRepository.clear();
    setState({
      user: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    isAuthenticated: !!state.user,
    login,
    register,
    logout,
    clearError,
  };
};
