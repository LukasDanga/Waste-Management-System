/**
 * EcoWaste - API Service
 * Centralized API service with interceptors and error handling
 */

import { API_ENDPOINTS, APP_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '../../constants';
import type { ApiResponse, ApiError } from '../../types';

// ==================== API CLIENT ====================

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = APP_CONFIG.API_BASE_URL;
    this.timeout = APP_CONFIG.API_TIMEOUT;
  }

  // Get auth token from storage
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return raw ? raw.replace(/^"|"$/g, '') : null;
  }

  // Set auth token to storage
  private setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  // Remove auth token from storage
  private removeAuthToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Build headers
  private buildHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Clear tokens but avoid forced navigation so calling screens can handle toast/UI
        this.removeAuthToken();
        throw new Error(ERROR_MESSAGES.SESSION_EXPIRED);
      }

      // Handle other errors
      const error: ApiError = {
        message: data?.message || ERROR_MESSAGES.SERVER_ERROR,
        code: data?.code || 'UNKNOWN_ERROR',
        status: response.status,
        details: data?.details,
      };

      throw error;
    }

    // Prefer `payload` (IAM API) then `data` (other APIs)
    const payload = data?.payload ?? data?.data ?? data;

    return {
      success: true,
      data: payload,
      message: data?.message,
    };
  }

  // Handle error
  private handleError(error: any): never {
    if (error instanceof Error) {
      throw error;
    }

    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }

  // GET request
  async get<T = any>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'GET',
        headers: this.buildHeaders(),
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST request
  async post<T = any>(url: string, data?: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'POST',
        headers: this.buildHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT request
  async put<T = any>(url: string, data?: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'PUT',
        headers: this.buildHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PATCH request
  async patch<T = any>(url: string, data?: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'PATCH',
        headers: this.buildHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE request
  async delete<T = any>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'DELETE',
        headers: this.buildHeaders(),
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Upload file
  async upload<T = any>(url: string, formData: FormData, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const token = this.getAuthToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'POST',
        headers,
        body: formData,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// ==================== AUTH SERVICE ====================

export const authService = {
  async login(credentials: { email: string; password: string; roleCode: string }) {
    return apiClient.post('/iam/auth/login', credentials);
  },

  async register(data: any) {
    return apiClient.post(API_ENDPOINTS.REGISTER, data);
  },

  async logout() {
    const response = await apiClient.post(API_ENDPOINTS.LOGOUT);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
    return response;
  },

  async refreshToken() {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) 
      : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return apiClient.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
  },

  async forgotPassword(email: string) {
    return apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, newPassword: string) {
    return apiClient.post(API_ENDPOINTS.RESET_PASSWORD, { token, newPassword });
  },
};

// ==================== USER SERVICE ====================

export const userService = {
  async getProfile() {
    return apiClient.get(API_ENDPOINTS.USER_PROFILE);
  },

  async updateProfile(data: any) {
    return apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, data);
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
  },

  async getUsers(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.USERS}${queryString}`);
  },

  // IAM user list (sorted by identity)
  async getIamUsers(sortBy: string = 'SORT_BY_IDENTITY') {
    return apiClient.get(`/iam/user?sortBy=${encodeURIComponent(sortBy)}`);
  },
};

