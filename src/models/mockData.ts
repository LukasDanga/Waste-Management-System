/**
 * EcoWaste - Mock Data
 * Mock data for development and testing
 */

import type { Report, Task, User, Citizen, Enterprise, Collector, Admin } from '../types';

// ==================== MOCK USERS ====================

export const mockCitizen: Citizen = {
  id: 'citizen-001',
  username: 'citizen_demo',
  email: 'citizen@ecowaste.vn',
  name: 'Nguyễn Văn A',
  phone: '0901234567',
  role: 'citizen',
  avatar: '',
  createdAt: '2025-12-01T10:00:00Z',
  updatedAt: '2026-01-12T10:00:00Z',
  status: 'active',
  points: 2350,
  totalReports: 157,
  area: 'Quận 3',
  address: '123 Nguyễn Thị Minh Khai, Quận 3, TP.HCM',
  level: 5,
  badges: [
    {
      id: 'badge-1',
      name: 'Eco Warrior',
      description: 'Hoàn thành 100+ báo cáo',
      icon: '🏆',
      criteria: '100 reports',
      earnedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'badge-2',
      name: 'Green Hero',
      description: 'Đạt 2000+ điểm',
      icon: '🌟',
      criteria: '2000 points',
      earnedAt: '2026-01-10T00:00:00Z',
    },
  ],
};

export const mockEnterprise: Enterprise = {
  id: 'enterprise-001',
  username: 'enterprise_demo',
  email: 'contact@greenrecycle.vn',
  name: 'Green Recycle Co., Ltd',
  phone: '028-12345678',
  role: 'enterprise',
  createdAt: '2025-12-01T10:00:00Z',
  updatedAt: '2026-01-12T10:00:00Z',
  status: 'active',
  companyName: 'Green Recycle Co., Ltd',
  license: '#ENV-2024-001',
  areas: ['Q1', 'Q3', 'Q7'],
  collectors: 8,
  capacity: {
    recyclable: 100,
    organic: 50,
    general: 80,
  },
  rating: 4.8,
  totalCollections: 1250,
  verificationStatus: 'verified',
  registrationDate: '2025-12-01',
};

export const mockCollector: Collector = {
  id: 'collector-001',
  username: 'collector_demo',
  email: 'collector@greenrecycle.vn',
  name: 'Nguyễn Văn B',
  phone: '0901234567',
  role: 'collector',
  createdAt: '2025-12-15T10:00:00Z',
  updatedAt: '2026-01-12T10:00:00Z',
  status: 'active',
  enterpriseId: 'enterprise-001',
  enterpriseName: 'Green Recycle Co., Ltd',
  vehicle: '51A-12345',
  vehicleType: 'truck',
  areas: ['Q1', 'Q3'],
  rating: 4.8,
  totalCompleted: 345,
  currentStatus: 'available',
  location: {
    lat: 10.7769,
    lng: 106.7009,
  },
};

export const mockAdmin: Admin = {
  id: 'admin-001',
  username: 'admin_demo',
  email: 'admin@ecowaste.vn',
  name: 'Quản Trị Viên',
  phone: '028-99999999',
  role: 'admin',
  createdAt: '2025-11-01T10:00:00Z',
  updatedAt: '2026-01-12T10:00:00Z',
  status: 'active',
  permissions: ['all'],
  department: 'IT & Operations',
};

// ==================== MOCK REPORTS ====================

export const mockReports: Report[] = [
  {
    id: 'report-001',
    citizenId: 'citizen-001',
    citizenName: 'Nguyễn Văn A',
    title: 'Rác thải tái chế tại công viên',
    description: 'Nhiều chai nhựa và giấy carton tại góc công viên Tao Đàn',
    wasteType: 'recyclable',
    status: 'pending',
    priority: 'medium',
    location: {
      address: '123 Công viên Tao Đàn, Quận 1, TP.HCM',
      lat: 10.7769,
      lng: 106.7009,
      district: 'Quận 1',
      ward: 'Phường Bến Thành',
    },
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800',
    ],
    aiClassification: {
      type: 'recyclable',
      confidence: 0.95,
      suggestions: ['Chai nhựa PET', 'Giấy carton'],
    },
    estimatedWeight: 15,
    createdAt: '2026-01-12T08:30:00Z',
    updatedAt: '2026-01-12T08:30:00Z',
    scheduledDate: '2026-01-13T10:00:00Z',
  },
  {
    id: 'report-002',
    citizenId: 'citizen-001',
    citizenName: 'Nguyễn Văn A',
    title: 'Rác hữu cơ từ chợ',
    description: 'Rác thải thực phẩm và rau củ từ chợ Bến Thành',
    wasteType: 'organic',
    status: 'assigned',
    priority: 'high',
    location: {
      address: 'Chợ Bến Thành, Quận 1, TP.HCM',
      lat: 10.7720,
      lng: 106.6980,
      district: 'Quận 1',
      ward: 'Phường Bến Thành',
    },
    images: [
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800',
    ],
    assignedTo: {
      collectorId: 'collector-001',
      collectorName: 'Nguyễn Văn B',
      enterpriseId: 'enterprise-001',
      enterpriseName: 'Green Recycle Co., Ltd',
    },
    estimatedWeight: 25,
    createdAt: '2026-01-11T14:20:00Z',
    updatedAt: '2026-01-12T09:00:00Z',
    scheduledDate: '2026-01-12T16:00:00Z',
  },
  {
    id: 'report-003',
    citizenId: 'citizen-002',
    citizenName: 'Trần Thị B',
    title: 'Thiết bị điện tử cũ',
    description: 'Máy tính, màn hình và linh kiện điện tử cần xử lý',
    wasteType: 'electronic',
    status: 'completed',
    priority: 'low',
    location: {
      address: '456 Lê Lợi, Quận 3, TP.HCM',
      lat: 10.7756,
      lng: 106.6920,
      district: 'Quận 3',
      ward: 'Phường 1',
    },
    images: [
      'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800',
    ],
    assignedTo: {
      collectorId: 'collector-001',
      collectorName: 'Nguyễn Văn B',
      enterpriseId: 'enterprise-001',
      enterpriseName: 'Green Recycle Co., Ltd',
    },
    estimatedWeight: 10,
    actualWeight: 12,
    pointsAwarded: 120,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-11T15:30:00Z',
    scheduledDate: '2026-01-11T14:00:00Z',
    completedAt: '2026-01-11T15:30:00Z',
  },
];

// ==================== MOCK TASKS ====================

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    reportId: 'report-002',
    collectorId: 'collector-001',
    status: 'accepted',
    priority: 'high',
    wasteType: 'organic',
    location: {
      address: 'Chợ Bến Thành, Quận 1, TP.HCM',
      lat: 10.7720,
      lng: 106.6980,
    },
    estimatedWeight: 25,
    scheduledTime: '2026-01-12T16:00:00Z',
  },
  {
    id: 'task-002',
    reportId: 'report-001',
    collectorId: 'collector-001',
    status: 'pending',
    priority: 'medium',
    wasteType: 'recyclable',
    location: {
      address: '123 Công viên Tao Đàn, Quận 1, TP.HCM',
      lat: 10.7769,
      lng: 106.7009,
    },
    estimatedWeight: 15,
    scheduledTime: '2026-01-13T10:00:00Z',
  },
  {
    id: 'task-003',
    reportId: 'report-003',
    collectorId: 'collector-001',
    status: 'completed',
    priority: 'low',
    wasteType: 'electronic',
    location: {
      address: '456 Lê Lợi, Quận 3, TP.HCM',
      lat: 10.7756,
      lng: 106.6920,
    },
    estimatedWeight: 10,
    actualWeight: 12,
    scheduledTime: '2026-01-11T14:00:00Z',
    startedAt: '2026-01-11T14:05:00Z',
    completedAt: '2026-01-11T15:30:00Z',
    rating: 5,
    feedback: 'Nhân viên rất nhiệt tình và chuyên nghiệp!',
  },
];

// ==================== EXPORT ALL ====================

export const mockData = {
  users: {
    citizen: mockCitizen,
    enterprise: mockEnterprise,
    collector: mockCollector,
    admin: mockAdmin,
  },
  reports: mockReports,
  tasks: mockTasks,
};

export default mockData;
