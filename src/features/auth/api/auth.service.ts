import { apiClient } from "../../../lib/api/client";
import { API_ENDPOINTS } from "../../../lib/api/endpoints";
import { LoginCredentials, RegisterData, AuthResponse } from "./auth.types";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // El backend ya devuelve { success: true, data: { access_token, user } }
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    return response.data;
  }

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
