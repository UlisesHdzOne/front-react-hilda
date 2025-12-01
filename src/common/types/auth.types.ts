export type UserRole = "ADMIN" | "CONSUMER" | "MANAGER";

export interface BaseUser {
  id: number;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  bio: string | null;
  avatarUrl: string | null;
  address?: string;
  birthDate?: string;
}

export interface User extends BaseUser {
  profile?: UserProfile;
}

export interface UserWithProfile extends BaseUser {
  profile?: UserProfile;
}

export interface AuthUser extends UserWithProfile {
  permissions?: string[];
}

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
  refresh_token?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserSession {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}
