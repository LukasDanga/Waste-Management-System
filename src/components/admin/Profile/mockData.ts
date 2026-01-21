import type { LoginEntry, PermissionEntry, ProfileData } from './types';

export const defaultProfile: ProfileData = {
  fullName: 'Phạm Văn E',
  adminId: 'ADMIN-001',
  email: 'admin@ecowaste.vn',
  phone: '0909876543',
  position: 'Quản trị viên hệ thống',
  department: 'Phòng Công nghệ thông tin',
  dateJoined: '01/06/2020',
};

export const loginHistory: LoginEntry[] = [
  { id: 1, device: 'Chrome • Windows 11', location: 'TP.HCM, Việt Nam', time: '20/01/2026 09:15', status: 'active' },
  { id: 2, device: 'Safari • MacOS', location: 'TP.HCM, Việt Nam', time: '19/01/2026 14:30', status: 'success' },
  { id: 3, device: 'Chrome • Android', location: 'TP.HCM, Việt Nam', time: '18/01/2026 08:45', status: 'success' },
  { id: 4, device: 'Firefox • Windows 10', location: 'Hà Nội, Việt Nam', time: '17/01/2026 16:20', status: 'success' },
];

export const permissions: PermissionEntry[] = [
  { module: 'Quản lý người dùng', read: true, write: true, delete: true },
  { module: 'Quản lý doanh nghiệp', read: true, write: true, delete: true },
  { module: 'Giám sát báo cáo', read: true, write: true, delete: false },
  { module: 'Khiếu nại & Tranh chấp', read: true, write: true, delete: false },
  { module: 'Phân quyền', read: true, write: true, delete: true },
  { module: 'Cài đặt hệ thống', read: true, write: true, delete: true },
  { module: 'Báo cáo tổng hợp', read: true, write: false, delete: false },
];
