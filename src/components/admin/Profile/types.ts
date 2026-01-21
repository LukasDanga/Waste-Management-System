export interface ProfileData {
  fullName: string;
  adminId: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  dateJoined: string;
}

export interface LoginEntry {
  id: number;
  device: string;
  location: string;
  time: string;
  status: string;
}

export interface PermissionEntry {
  module: string;
  read: boolean;
  write: boolean;
  delete: boolean;
}
