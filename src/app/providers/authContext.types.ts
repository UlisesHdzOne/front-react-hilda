import { createContext, useContext } from "react";
import {
  LoginCredentials,
  RegisterData,
  User,
} from "../../common/types/auth.types";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// ✅ Contexto en archivo SEPARADO
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// ✅ Hook en el MISMO archivo que el contexto (está permitido)
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
