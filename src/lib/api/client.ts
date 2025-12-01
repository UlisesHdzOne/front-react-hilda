import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ApiResponse, ApiError } from "../../types";

class ApiService {
  private client: AxiosInstance;
  private baseURL: string =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor para agregar token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor para manejar respuestas estandarizadas
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response;
      },
      (error: AxiosError<ApiError>) => {
        console.error("API Error Interceptor:", error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, params?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export const apiClient = new ApiService();
