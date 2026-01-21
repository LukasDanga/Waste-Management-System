import type { Icon as LucideIcon } from 'lucide-react';

export type EnterpriseStatus = 'verified' | 'pending' | 'suspended';

export interface Enterprise {
  id: string;
  name: string;
  phone: string;
  email: string;
  license: string;
  status: EnterpriseStatus;
  areas: string[];
  collectors: number;
  address?: string;
  registrationDate?: string;
}

export interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}
