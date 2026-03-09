/**
 * EcoWaste - API Configuration
 * API endpoints and configuration settings
 */

// Helper to safely access environment variables (Vite + window ENV fallback)
const getEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any)?.env) {
    const val = (import.meta as any).env[key];
    if (val) return val;
  }
  if (typeof window !== 'undefined') {
    return (window as any).ENV?.[key] || defaultValue;
  }
  return defaultValue;
};

export const API_CONFIG = {
  // Base URL
  BASE_URL: getEnv('VITE_API_BASE_URL', getEnv('API_BASE_URL', 'http://localhost:3000/api')),
  IMAGE_BASE_URL: getEnv('VITE_IMAGE_BASE_URL', ''),
  
  // Timeout
  TIMEOUT: Number(getEnv('API_TIMEOUT', '30000')) || 30000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
  
  // Headers
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    ACCEPT: 'application/json',
  },
} as const;