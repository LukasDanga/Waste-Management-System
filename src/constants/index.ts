/**
 * EcoWaste - Application Constants
 * Centralized constants for the entire application
 */

// ==================== USER ROLES ====================

export const USER_ROLES = {
  CITIZEN: 'CITIZEN',
  ENTERPRISE: 'ENTERPRISE',
  COLLECTOR: 'COLLECTOR',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const ROLE_LABELS = {
  CITIZEN: 'Người dân',
  ENTERPRISE: 'Doanh nghiệp',
  COLLECTOR: 'Nhân viên thu gom',
  SUPER_ADMIN: 'Quản trị viên cấp cao',
} as const;

// ==================== STATUS ====================

export const REPORT_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const REPORT_STATUS_LABELS = {
  pending: 'Chờ xử lý',
  assigned: 'Đã phân công',
  in_progress: 'Đang thu gom',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
} as const;

export const TASK_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const TASK_STATUS_LABELS = {
  pending: 'Chờ nhận',
  accepted: 'Đã nhận',
  in_progress: 'Đang thực hiện',
  completed: 'Hoàn thành',
  failed: 'Thất bại',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

export const VERIFICATION_STATUS = {
  VERIFIED: 'verified',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
} as const;

export const VERIFICATION_STATUS_LABELS = {
  verified: 'Đã xác minh',
  pending: 'Chờ duyệt',
  suspended: 'Đình chỉ',
} as const;

// ==================== PRIORITY ====================

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const PRIORITY_LABELS = {
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao',
  urgent: 'Khẩn cấp',
} as const;

export const PRIORITY_COLORS = {
  low: 'text-gray-600 bg-gray-100 border-gray-200',
  medium: 'text-blue-600 bg-blue-100 border-blue-200',
  high: 'text-orange-600 bg-orange-100 border-orange-200',
  urgent: 'text-red-600 bg-red-100 border-red-200',
} as const;

// ==================== WASTE TYPES ====================

export const WASTE_TYPES = {
  RECYCLABLE: 'recyclable',
  ORGANIC: 'organic',
  HAZARDOUS: 'hazardous',
  GENERAL: 'general',
  ELECTRONIC: 'electronic',
} as const;

export const WASTE_TYPE_LABELS = {
  recyclable: 'Tái chế',
  organic: 'Hữu cơ',
  hazardous: 'Nguy hại',
  general: 'Sinh hoạt',
  electronic: 'Điện tử',
} as const;

export const WASTE_TYPE_COLORS = {
  recyclable: 'text-green-600 bg-green-100 border-green-200',
  organic: 'text-amber-600 bg-amber-100 border-amber-200',
  hazardous: 'text-red-600 bg-red-100 border-red-200',
  general: 'text-gray-600 bg-gray-100 border-gray-200',
  electronic: 'text-blue-600 bg-blue-100 border-blue-200',
} as const;

export const WASTE_TYPE_ICONS = {
  recyclable: '♻️',
  organic: '🌱',
  hazardous: '☢️',
  general: '🗑️',
  electronic: '💻',
} as const;

// ==================== DISPUTE TYPES ====================

export const DISPUTE_TYPES = {
  REPORT_ISSUE: 'report_issue',
  COLLECTION_ISSUE: 'collection_issue',
  PAYMENT_ISSUE: 'payment_issue',
  OTHER: 'other',
} as const;

export const DISPUTE_TYPE_LABELS = {
  report_issue: 'Vấn đề báo cáo',
  collection_issue: 'Vấn đề thu gom',
  payment_issue: 'Vấn đề điểm thưởng',
  other: 'Khác',
} as const;

export const DISPUTE_STATUS = {
  OPEN: 'open',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
} as const;

export const DISPUTE_STATUS_LABELS = {
  open: 'Mới',
  investigating: 'Đang xử lý',
  resolved: 'Đã giải quyết',
  rejected: 'Đã từ chối',
} as const;

// ==================== POINT RULES ====================

export const DEFAULT_POINT_RULES = {
  recyclable: 100,
  organic: 50,
  hazardous: 150,
  general: 30,
  electronic: 120,
  bonusMultiplier: 1.5,
  referralBonus: 200,
  firstReportBonus: 50,
} as const;

export const POINT_TRANSACTION_TYPES = {
  EARN: 'earn',
  REDEEM: 'redeem',
} as const;

export const POINT_SOURCES = {
  REPORT: 'report',
  BONUS: 'bonus',
  EVENT: 'event',
  REDEMPTION: 'redemption',
  REFERRAL: 'referral',
} as const;

// ==================== BADGE CRITERIA ====================

export const BADGE_TYPES = {
  NEWCOMER: 'newcomer',
  REPORTER: 'reporter',
  ECO_WARRIOR: 'eco_warrior',
  RECYCLING_CHAMPION: 'recycling_champion',
  WEEKLY_HERO: 'weekly_hero',
  MONTHLY_STAR: 'monthly_star',
} as const;

// ==================== NOTIFICATION TYPES ====================

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// ==================== API ENDPOINTS ====================

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  
  // Users
  USERS: '/api/users',
  USER_PROFILE: '/api/users/profile',
  UPDATE_PROFILE: '/api/users/profile',
  CHANGE_PASSWORD: '/api/users/change-password',
  
  // Reports
  REPORTS: '/api/reports',
  REPORT_DETAIL: (id: string) => `/api/reports/${id}`,
  CREATE_REPORT: '/api/reports',
  UPDATE_REPORT: (id: string) => `/api/reports/${id}`,
  DELETE_REPORT: (id: string) => `/api/reports/${id}`,
  ASSIGN_REPORT: (id: string) => `/api/reports/${id}/assign`,
  
  // Tasks
  TASKS: '/api/tasks',
  TASK_DETAIL: (id: string) => `/api/tasks/${id}`,
  UPDATE_TASK: (id: string) => `/api/tasks/${id}`,
  ACCEPT_TASK: (id: string) => `/api/tasks/${id}/accept`,
  COMPLETE_TASK: (id: string) => `/api/tasks/${id}/complete`,
  
  // Enterprises
  ENTERPRISES: '/api/enterprises',
  ENTERPRISE_DETAIL: (id: string) => `/api/enterprises/${id}`,
  ENTERPRISE_COLLECTORS: (id: string) => `/api/enterprises/${id}/collectors`,
  ENTERPRISE_REQUESTS: (id: string) => `/api/enterprises/${id}/requests`,
  
  // Collectors
  COLLECTORS: '/api/collectors',
  COLLECTOR_DETAIL: (id: string) => `/api/collectors/${id}`,
  COLLECTOR_LOCATION: (id: string) => `/api/collectors/${id}/location`,
  
  // Points
  POINTS: '/api/points',
  POINT_TRANSACTIONS: '/api/points/transactions',
  REWARDS: '/api/rewards',
  REDEEM_REWARD: (id: string) => `/api/rewards/${id}/redeem`,
  
  // Disputes
  DISPUTES: '/api/disputes',
  DISPUTE_DETAIL: (id: string) => `/api/disputes/${id}`,
  CREATE_DISPUTE: '/api/disputes',
  RESOLVE_DISPUTE: (id: string) => `/api/disputes/${id}/resolve`,
  
  // Analytics
  ANALYTICS: '/api/analytics',
  DASHBOARD_STATS: '/api/analytics/dashboard',
  REPORT_ANALYTICS: '/api/analytics/reports',
  USER_ANALYTICS: '/api/analytics/users',
  
  // AI
  AI_CLASSIFY: '/api/ai/classify',
  
  // Notifications
  NOTIFICATIONS: '/api/notifications',
  MARK_AS_READ: (id: string) => `/api/notifications/${id}/read`,
  MARK_ALL_AS_READ: '/api/notifications/read-all',
  
  // Settings
  SETTINGS: '/api/settings',
  UPDATE_SETTINGS: '/api/settings',
  
  // Upload
  UPLOAD_IMAGE: '/api/upload/image',
  UPLOAD_MULTIPLE: '/api/upload/multiple',
} as const;

// ==================== LOCAL STORAGE KEYS ====================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ecowaste_access_token',
  REFRESH_TOKEN: 'ecowaste_refresh_token',
  USER_DATA: 'ecowaste_user_data',
  LANGUAGE: 'ecowaste_language',
  THEME: 'ecowaste_theme',
  REMEMBER_ME: 'ecowaste_remember_me',
} as const;

// ==================== PAGINATION ====================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// ==================== VALIDATION ====================

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_REPORT: 5,
} as const;

// ==================== MAP SETTINGS ====================

export const MAP_SETTINGS = {
  DEFAULT_CENTER: {
    lat: 10.7769,
    lng: 106.7009,
  }, // TP.HCM
  DEFAULT_ZOOM: 13,
  MAX_ZOOM: 18,
  MIN_ZOOM: 10,
  MARKER_CLUSTER_MAX_ZOOM: 15,
} as const;

// ==================== DATE FORMATS ====================

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_TIME: 'YYYY-MM-DD HH:mm:ss',
  TIME_ONLY: 'HH:mm',
} as const;

// ==================== DEMO ACCOUNTS ====================

export const DEMO_ACCOUNTS = {
  CITIZEN: {
    username: 'citizen_demo',
    password: 'citizen123',
    role: USER_ROLES.CITIZEN,
  },
  ENTERPRISE: {
    username: 'enterprise_demo',
    password: 'enterprise123',
    role: USER_ROLES.ENTERPRISE,
  },
  COLLECTOR: {
    username: 'collector_demo',
    password: 'collector123',
    role: USER_ROLES.COLLECTOR,
  },
  SUPER_ADMIN: {
    username: 'longdong32120@gmail.com',
    password: '280120051',
    role: USER_ROLES.SUPER_ADMIN,
  },
} as const;

// ==================== REGEX PATTERNS ====================

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(0|\+84)[1-9][0-9]{8,9}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  LICENSE_PLATE: /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/,
} as const;

// ==================== ERROR MESSAGES ====================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại.',
  UNAUTHORIZED: 'Bạn không có quyền truy cập.',
  SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  INVALID_CREDENTIALS: 'Tên đăng nhập hoặc mật khẩu không đúng.',
  SERVER_ERROR: 'Lỗi máy chủ. Vui lòng thử lại sau.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ.',
  NOT_FOUND: 'Không tìm thấy dữ liệu.',
  FILE_TOO_LARGE: 'File quá lớn. Kích thước tối đa 5MB.',
  INVALID_FILE_TYPE: 'Định dạng file không được hỗ trợ.',
} as const;

// ==================== SUCCESS MESSAGES ====================

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  LOGOUT_SUCCESS: 'Đăng xuất thành công!',
  REGISTER_SUCCESS: 'Đăng ký thành công!',
  UPDATE_SUCCESS: 'Cập nhật thành công!',
  DELETE_SUCCESS: 'Xóa thành công!',
  CREATE_SUCCESS: 'Tạo mới thành công!',
  SUBMIT_SUCCESS: 'Gửi thành công!',
  SAVE_SUCCESS: 'Lưu thành công!',
} as const;

// ==================== FEATURE FLAGS ====================

export const FEATURE_FLAGS = {
  ENABLE_AI_CLASSIFICATION: true,
  ENABLE_REAL_TIME_TRACKING: true,
  ENABLE_GAMIFICATION: true,
  ENABLE_LEADERBOARD: true,
  ENABLE_REWARDS: true,
  ENABLE_DISPUTES: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
} as const;

// ==================== APP CONFIG ====================

const viteApiBase = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_API_BASE_URL : undefined;
const browserEnvApiBase = typeof window !== 'undefined' ? (window as any).ENV?.API_BASE_URL : undefined;
const rawBaseUrl = viteApiBase || browserEnvApiBase || 'http://localhost:3000';
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '');

export const APP_CONFIG = {
  APP_NAME: 'EcoWaste',
  APP_VERSION: '1.0.0',
  API_BASE_URL: normalizedBaseUrl,
  API_TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;