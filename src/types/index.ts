/**
 * EcoWaste - Type Definitions
 * Centralized type definitions for the entire application
 */

// ==================== USER TYPES ====================

export type UserRole = 'citizen' | 'enterprise' | 'collector' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Citizen extends User {
  role: 'citizen';
  points: number;
  totalReports: number;
  area: string;
  address?: string;
  level: number;
  badges: Badge[];
}

export interface Enterprise extends User {
  role: 'enterprise';
  companyName: string;
  license: string;
  areas: string[];
  collectors: number;
  capacity: {
    recyclable: number;
    organic: number;
    general: number;
  };
  rating: number;
  totalCollections: number;
  verificationStatus: 'verified' | 'pending' | 'suspended';
  registrationDate: string;
}

export interface Collector extends User {
  role: 'collector';
  enterpriseId: string;
  enterpriseName: string;
  vehicle: string;
  vehicleType: 'truck' | 'motorcycle' | 'bicycle';
  areas: string[];
  rating: number;
  totalCompleted: number;
  currentStatus: 'available' | 'busy' | 'offline';
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
  department?: string;
}

// ==================== REPORT TYPES ====================

export type ReportStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export type ReportPriority = 'low' | 'medium' | 'high' | 'urgent';
export type WasteType = 'recyclable' | 'organic' | 'hazardous' | 'general' | 'electronic';

export interface Report {
  id: string;
  citizenId: string;
  citizenName: string;
  title: string;
  description: string;
  wasteType: WasteType;
  status: ReportStatus;
  priority: ReportPriority;
  location: {
    address: string;
    lat: number;
    lng: number;
    district: string;
    ward: string;
  };
  images: string[];
  aiClassification?: {
    type: WasteType;
    confidence: number;
    suggestions: string[];
  };
  assignedTo?: {
    collectorId: string;
    collectorName: string;
    enterpriseId: string;
    enterpriseName: string;
  };
  estimatedWeight?: number;
  actualWeight?: number;
  pointsAwarded?: number;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  completedAt?: string;
  notes?: string;
}

// ==================== TASK TYPES ====================

export type TaskStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'failed';

export interface Task {
  id: string;
  reportId: string;
  collectorId: string;
  status: TaskStatus;
  priority: ReportPriority;
  wasteType: WasteType;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  estimatedWeight?: number;
  actualWeight?: number;
  scheduledTime: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  images?: string[];
  rating?: number;
  feedback?: string;
}

// ==================== COLLECTION REQUEST TYPES ====================

export type RequestStatus = 'new' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface CollectionRequest {
  id: string;
  enterpriseId: string;
  title: string;
  description: string;
  area: string;
  wasteTypes: WasteType[];
  status: RequestStatus;
  priority: ReportPriority;
  assignedCollectors: string[];
  scheduledDate: string;
  estimatedQuantity: number;
  actualQuantity?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// ==================== POINT & REWARD TYPES ====================

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem';
  amount: number;
  source: 'report' | 'bonus' | 'event' | 'redemption';
  description: string;
  reportId?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'voucher' | 'product' | 'service' | 'donation';
  image: string;
  stock: number;
  available: boolean;
  expiresAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earnedAt?: string;
}

// ==================== DISPUTE TYPES ====================

export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'rejected';
export type DisputeType = 'report_issue' | 'collection_issue' | 'payment_issue' | 'other';

export interface Dispute {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: UserRole;
  type: DisputeType;
  subject: string;
  description: string;
  status: DisputeStatus;
  relatedReportId?: string;
  relatedTaskId?: string;
  evidence: string[];
  assignedAdminId?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

// ==================== ANALYTICS TYPES ====================

export interface DashboardStats {
  totalReports?: number;
  pendingReports?: number;
  completedReports?: number;
  totalPoints?: number;
  totalUsers?: number;
  totalEnterprises?: number;
  totalCollectors?: number;
  wasteCollected?: number;
  recyclingRate?: number;
  activeCollectors?: number;
  revenue?: number;
  growth?: {
    reports: number;
    users: number;
    waste: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

// ==================== API TYPES ====================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
}

// ==================== FORM TYPES ====================

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: UserRole;
  area?: string;
  companyName?: string;
  license?: string;
}

export interface CreateReportData {
  title: string;
  description: string;
  wasteType: WasteType;
  location: {
    address: string;
    lat: number;
    lng: number;
    district: string;
    ward: string;
  };
  images: File[];
  estimatedWeight?: number;
  scheduledDate?: string;
}

export interface UpdateTaskData {
  status: TaskStatus;
  actualWeight?: number;
  notes?: string;
  images?: File[];
  completedAt?: string;
}

// ==================== NOTIFICATION TYPES ====================

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// ==================== SETTINGS TYPES ====================

export interface SystemSettings {
  pointRules: {
    recyclable: number;
    organic: number;
    hazardous: number;
    general: number;
    bonusMultiplier: number;
  };
  operatingHours: {
    start: string;
    end: string;
  };
  maxReportDistance: number;
  enableAiClassification: boolean;
  maintenanceMode: boolean;
  features: {
    gamification: boolean;
    leaderboard: boolean;
    rewards: boolean;
    disputes: boolean;
  };
}

// ==================== PERMISSION TYPES ====================

export type Permission = 
  | 'view_dashboard'
  | 'manage_users'
  | 'manage_enterprises'
  | 'manage_reports'
  | 'manage_disputes'
  | 'manage_settings'
  | 'view_analytics'
  | 'manage_permissions'
  | 'all';

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  description: string;
}
