export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  phone: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;
