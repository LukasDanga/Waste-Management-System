/**
 * EcoWaste - API Configuration
 * API endpoints and configuration settings
 */

// Helper to safely access environment variables
const getEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof window !== 'undefined') {
    return (window as any).ENV?.[key] || defaultValue;
  }
  return defaultValue;
};

export const API_CONFIG = {
  // Base URL
  BASE_URL: getEnv('API_BASE_URL', 'http://localhost:3000/api'),
  
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

export const WEBSOCKET_CONFIG = {
  URL: getEnv('SOCKET_URL', 'ws://localhost:3001'),
  RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 3000,
} as const;

export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ALL: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'],
  },
  MAX_FILES: 5,
} as const;

export const GOOGLE_MAPS_CONFIG = {
  API_KEY: getEnv('GOOGLE_MAPS_API_KEY', ''),
  DEFAULT_CENTER: {
    lat: 10.7769,
    lng: 106.7009,
  },
  DEFAULT_ZOOM: 13,
  LIBRARIES: ['places', 'geometry'],
} as const;

export const FEATURE_CONFIG = {
  AI_CLASSIFICATION: getEnv('ENABLE_AI_CLASSIFICATION', 'true') === 'true',
  REAL_TIME_TRACKING: getEnv('ENABLE_REAL_TIME_TRACKING', 'true') === 'true',
  GAMIFICATION: getEnv('ENABLE_GAMIFICATION', 'true') === 'true',
  LEADERBOARD: getEnv('ENABLE_LEADERBOARD', 'true') === 'true',
  REWARDS: getEnv('ENABLE_REWARDS', 'true') === 'true',
  DISPUTES: getEnv('ENABLE_DISPUTES', 'true') === 'true',
  ANALYTICS: getEnv('ENABLE_ANALYTICS', 'true') === 'true',
  NOTIFICATIONS: getEnv('ENABLE_NOTIFICATIONS', 'true') === 'true',
} as const;