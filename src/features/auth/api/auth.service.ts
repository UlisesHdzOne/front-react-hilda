// import { apiClient } from "@/lib/api/client";
// import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "../../../lib/api/client";
import { API_ENDPOINTS } from "../../../lib/api/endpoints";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  LoginResponse,
  RegisterResponse,
} from "./auth.types";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return res.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const res = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return res.data;
  }

  logout() {
    localStorage.removeItem("access_token");
  }
}

export const authService = new AuthService();
