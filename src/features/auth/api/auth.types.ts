import { User } from "../../../types";

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export type AuthUser = User;
export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;
