import { apiClient } from "../../../lib/api/client";
import { API_ENDPOINTS } from "../../../lib/api/endpoints";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../../../common/types/auth.types";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // ✅ Validación antes de enviar
    if (!credentials.phone || !credentials.password) {
      throw new Error("Teléfono y contraseña son requeridos");
    }

    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // ✅ Validación antes de enviar
    if (data.password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  }
}

export const authService = new AuthService();
