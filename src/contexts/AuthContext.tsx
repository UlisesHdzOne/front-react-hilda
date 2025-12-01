import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, LoginCredentials, RegisterData } from "../types";
import { authService } from "../features/auth/api/auth.service";
import { parseApiError } from "../utils/errorParser";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const clearError = (): void => {
    setError(null);
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    clearError();

    try {
      const result = await authService.login(credentials);

      // Guardar en localStorage
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setUser(result.user);
    } catch (err: unknown) {
      const errorMessage = parseApiError(err);
      setError(errorMessage);
      setUser(null);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    clearError();

    try {
      const result = await authService.register(userData);

      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setUser(result.user);
    } catch (err: unknown) {
      const errorMessage = parseApiError(err);
      setError(errorMessage);
      setUser(null);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    clearError();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
