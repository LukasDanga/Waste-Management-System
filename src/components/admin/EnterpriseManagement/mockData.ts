import { Building2, CheckCircle, Clock, Ban } from 'lucide-react';
import type { Enterprise, StatItem } from './types';

export const enterprises: Enterprise[] = [
  {
    id: '1',
    name: 'Green Recycle Co., Ltd',
    phone: '028-12345678',
    email: 'contact@greenrecycle.vn',
    license: '#ENV-2024-001',
    status: 'verified',
    areas: ['Q1', 'Q3', 'Q7'],
    collectors: 8,
    address: '123 Nguyễn Huệ, Q1, TP.HCM',
    registrationDate: '01/12/2025',
  },
  {
    id: '2',
    name: 'Eco Solutions Ltd',
    phone: '028-87654321',
    email: 'info@ecosolutions.vn',
    license: '#ENV-2024-002',
    status: 'verified',
    areas: ['Q5', 'Q10'],
    collectors: 5,
    address: '456 Lê Lợi, Q5, TP.HCM',
    registrationDate: '15/12/2025',
  },
  {
    id: '3',
    name: 'Clean Earth Inc',
    phone: '028-11223344',
    email: 'admin@cleanearth.vn',
    license: '#ENV-2024-003',
    status: 'suspended',
    areas: ['Q2'],
    collectors: 3,
    address: '789 Võ Văn Tần, Q3, TP.HCM',
    registrationDate: '20/12/2025',
  },
];

export const pendingEnterprises: Enterprise[] = [
  {
    id: '4',
    name: 'Smart Waste Management',
    phone: '028-99887766',
    email: 'contact@smartwaste.vn',
    license: 'Đang chờ duyệt',
    status: 'pending',
    areas: ['Q4', 'Q8'],
    collectors: 0,
    address: '321 Pasteur, Q1, TP.HCM',
    registrationDate: '10/01/2026',
  },
  {
    id: '5',
    name: 'Recycle Pro Vietnam',
    phone: '028-55443322',
    email: 'info@recyclepro.vn',
    license: 'Đang chờ duyệt',
    status: 'pending',
    areas: ['Q6'],
    collectors: 0,
    address: '654 Hai Bà Trưng, Q1, TP.HCM',
    registrationDate: '11/01/2026',
  },
];

export const buildStats = (allEnterprises: Enterprise[]): StatItem[] => {
  const total = allEnterprises.length;
  const verified = allEnterprises.filter((e) => e.status === 'verified').length;
  const pending = allEnterprises.filter((e) => e.status === 'pending').length;
  const suspended = allEnterprises.filter((e) => e.status === 'suspended').length;

  return [
  {
    label: 'Tổng doanh nghiệp',
      value: total,
    icon: Building2,
    color: 'text-green-600',
  },
  {
    label: 'Đã xác minh',
      value: verified,
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    label: 'Chờ duyệt',
      value: pending,
    icon: Clock,
    color: 'text-yellow-600',
  },
  {
    label: 'Đình chỉ',
      value: suspended,
    icon: Ban,
    color: 'text-red-600',
  },
  ];
};
