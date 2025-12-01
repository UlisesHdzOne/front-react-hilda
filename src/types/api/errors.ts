export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  timestamp: string;
  path: string;
}

export interface NetworkError {
  code: "NETWORK_ERROR" | "TIMEOUT" | "CANCELLED";
  message: string;
  originalError?: unknown;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export type AppError = ApiError | NetworkError | Error;
