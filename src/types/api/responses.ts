export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  timestamp: string;
  metadata?: {
    path: string;
    method: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  timestamp: string;
  path: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  details: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}
