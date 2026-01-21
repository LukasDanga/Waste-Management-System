/**
 * EcoWaste - Helper Functions
 * Utility functions for common operations
 */

import { DATE_FORMATS, REGEX_PATTERNS } from '../constants';
import type { WasteType, ReportStatus, UserRole } from '../types';

// ==================== DATE & TIME ====================

/**
 * Format date to Vietnamese format
 */
export const formatDate = (date: string | Date, format: string = DATE_FORMATS.DISPLAY): string => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  switch (format) {
    case DATE_FORMATS.DISPLAY:
      return `${day}/${month}/${year}`;
    case DATE_FORMATS.DISPLAY_TIME:
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case DATE_FORMATS.API:
      return `${year}-${month}-${day}`;
    case DATE_FORMATS.API_TIME:
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case DATE_FORMATS.TIME_ONLY:
      return `${hours}:${minutes}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

/**
 * Get relative time (e.g., "2 giờ trước")
 */
export const getRelativeTime = (date: string | Date): string => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHour < 24) return `${diffHour} giờ trước`;
  if (diffDay < 7) return `${diffDay} ngày trước`;
  
  return formatDate(d);
};

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.getDate() === today.getDate() &&
         d.getMonth() === today.getMonth() &&
         d.getFullYear() === today.getFullYear();
};

// ==================== VALIDATION ====================

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  return REGEX_PATTERNS.PHONE.test(phone);
};

/**
 * Validate username
 */
export const isValidUsername = (username: string): boolean => {
  return REGEX_PATTERNS.USERNAME.test(username);
};

/**
 * Validate license plate
 */
export const isValidLicensePlate = (plate: string): boolean => {
  return REGEX_PATTERNS.LICENSE_PLATE.test(plate);
};

/**
 * Validate password strength
 */
export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  if (score <= 2) return { score, label: 'Yếu', color: 'red' };
  if (score <= 4) return { score, label: 'Trung bình', color: 'yellow' };
  return { score, label: 'Mạnh', color: 'green' };
};

// ==================== FORMATTING ====================

/**
 * Format number with thousands separator
 */
export const formatNumber = (num: number | string): string => {
  if (!num && num !== 0) return '0';
  const n = typeof num === 'string' ? parseFloat(num) : num;
  return n.toLocaleString('vi-VN');
};

/**
 * Format currency (VND)
 */
export const formatCurrency = (amount: number | string): string => {
  if (!amount && amount !== 0) return '0₫';
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${n.toLocaleString('vi-VN')}₫`;
};

/**
 * Format points
 */
export const formatPoints = (points: number | string): string => {
  if (!points && points !== 0) return '0 điểm';
  const n = typeof points === 'string' ? parseFloat(points) : points;
  return `${n.toLocaleString('vi-VN')} điểm`;
};

/**
 * Format weight (kg)
 */
export const formatWeight = (weight: number | string): string => {
  if (!weight && weight !== 0) return '0 kg';
  const n = typeof weight === 'string' ? parseFloat(weight) : weight;
  return `${n.toLocaleString('vi-VN')} kg`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  if (!value && value !== 0) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Shorten large numbers (e.g., 1000 -> 1K)
 */
export const shortenNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// ==================== STRING OPERATIONS ====================

/**
 * Truncate text
 */
export const truncate = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert to slug
 */
export const toSlug = (text: string): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// ==================== ARRAY OPERATIONS ====================

/**
 * Group array by key
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Remove duplicates from array
 */
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Shuffle array
 */
export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// ==================== OBJECT OPERATIONS ====================

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Pick specific keys from object
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Omit specific keys from object
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

// ==================== COLOR OPERATIONS ====================

/**
 * Generate random color
 */
export const randomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

/**
 * Get color based on status
 */
export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-100',
    assigned: 'text-blue-600 bg-blue-100',
    in_progress: 'text-purple-600 bg-purple-100',
    completed: 'text-green-600 bg-green-100',
    cancelled: 'text-red-600 bg-red-100',
    failed: 'text-red-600 bg-red-100',
    active: 'text-green-600 bg-green-100',
    inactive: 'text-gray-600 bg-gray-100',
    suspended: 'text-red-600 bg-red-100',
    verified: 'text-green-600 bg-green-100',
  };
  
  return colorMap[status] || 'text-gray-600 bg-gray-100';
};

// ==================== FILE OPERATIONS ====================

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Check if file is image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

// ==================== URL OPERATIONS ====================

/**
 * Build query string from object
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  return filtered ? `?${filtered}` : '';
};

/**
 * Parse query string to object
 */
export const parseQueryString = (queryString: string): Record<string, string> => {
  if (!queryString) return {};
  
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
};

// ==================== STORAGE OPERATIONS ====================

/**
 * Safe localStorage get
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Safe localStorage set
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

/**
 * Safe localStorage remove
 */
export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

// ==================== DEBOUNCE & THROTTLE ====================

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ==================== MISC ====================

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Download file
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Check if development mode
 */
export const isDevelopment = (): boolean => {
  return typeof window !== 'undefined' && (window as any).ENV?.NODE_ENV === 'development';
};

/**
 * Check if production mode
 */
export const isProduction = (): boolean => {
  return typeof window !== 'undefined' && (window as any).ENV?.NODE_ENV === 'production';
};