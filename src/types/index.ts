export type UserRole = "ADMIN" | "CONSUMER";

export interface User {
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: {
    id: number;
    bio: string | null;
    avatarUrl: string | null;
  };
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
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  details?: ApiErrorDetail[];
}

export interface ApiError {
  success: false;
  error: string | ApiErrorResponse;
  timestamp: string;
  path: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  timestamp: string;
  metadata?: {
    path: string;
    method: string;
  };
}

export interface AxiosErrorResponse {
  response?: {
    data?: ApiError;
    status?: number;
  };
  code?: string;
  message?: string;
}
