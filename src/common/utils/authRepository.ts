import { User } from "../types/auth.types";

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "access_token";

export const authRepository = {
  // ✅ Guardar con validación básica
  saveUser: (user: User): void => {
    if (!user || typeof user !== "object") {
      throw new Error("Datos de usuario inválidos");
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  // ✅ Leer con validación
  getUser: (): User | null => {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY);
      if (!data) return null;

      const user = JSON.parse(data) as User;
      // Validación mínima
      if (!user.id || !user.name || !user.phone || !user.role) {
        authRepository.clear();
        return null;
      }
      return user;
    } catch {
      authRepository.clear();
      return null;
    }
  },

  // ✅ Token management
  saveToken: (token: string): void => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  // ✅ Limpiar todo
  clear: (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};
