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
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
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
        this.removeAuthToken();
        window.location.href = '/login';
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
};

// ==================== REPORT SERVICE ====================

export const reportService = {
  async getReports(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.REPORTS}${queryString}`);
  },

  async getReportById(id: string) {
    return apiClient.get(API_ENDPOINTS.REPORT_DETAIL(id));
  },

  async createReport(data: any) {
    return apiClient.post(API_ENDPOINTS.CREATE_REPORT, data);
  },

  async updateReport(id: string, data: any) {
    return apiClient.put(API_ENDPOINTS.UPDATE_REPORT(id), data);
  },

  async deleteReport(id: string) {
    return apiClient.delete(API_ENDPOINTS.DELETE_REPORT(id));
  },

  async assignReport(id: string, data: { collectorId: string; enterpriseId: string }) {
    return apiClient.post(API_ENDPOINTS.ASSIGN_REPORT(id), data);
  },
};

// ==================== TASK SERVICE ====================

export const taskService = {
  async getTasks(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.TASKS}${queryString}`);
  },

  async getTaskById(id: string) {
    return apiClient.get(API_ENDPOINTS.TASK_DETAIL(id));
  },

  async updateTask(id: string, data: any) {
    return apiClient.put(API_ENDPOINTS.UPDATE_TASK(id), data);
  },

  async acceptTask(id: string) {
    return apiClient.post(API_ENDPOINTS.ACCEPT_TASK(id));
  },

  async completeTask(id: string, data: any) {
    return apiClient.post(API_ENDPOINTS.COMPLETE_TASK(id), data);
  },
};

// ==================== ENTERPRISE SERVICE ====================

export const enterpriseService = {
  async getEnterprises(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.ENTERPRISES}${queryString}`);
  },

  async getEnterpriseById(id: string) {
    return apiClient.get(API_ENDPOINTS.ENTERPRISE_DETAIL(id));
  },

  async getCollectors(id: string) {
    return apiClient.get(API_ENDPOINTS.ENTERPRISE_COLLECTORS(id));
  },

  async getRequests(id: string) {
    return apiClient.get(API_ENDPOINTS.ENTERPRISE_REQUESTS(id));
  },
};

// ==================== ANALYTICS SERVICE ====================

export const analyticsService = {
  async getDashboardStats() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD_STATS);
  },

  async getReportAnalytics(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.REPORT_ANALYTICS}${queryString}`);
  },

  async getUserAnalytics(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.USER_ANALYTICS}${queryString}`);
  },
};

// ==================== AI SERVICE ====================

export const aiService = {
  async classifyImage(formData: FormData) {
    return apiClient.upload(API_ENDPOINTS.AI_CLASSIFY, formData);
  },
};

// ==================== UPLOAD SERVICE ====================

export const uploadService = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.upload(API_ENDPOINTS.UPLOAD_IMAGE, formData);
  },

  async uploadMultiple(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return apiClient.upload(API_ENDPOINTS.UPLOAD_MULTIPLE, formData);
  },
};
