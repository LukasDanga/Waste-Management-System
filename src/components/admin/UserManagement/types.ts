export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  status: 'active' | 'suspended' | 'deleted';
  createdAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  password: string;
}
