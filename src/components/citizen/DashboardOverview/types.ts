import type { LucideIcon } from 'lucide-react';

export interface DashboardStat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface QuickAction {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  style: 'primary' | 'outline';
  onClick?: () => void;
}

export interface RecentReport {
  id: string;
  location: string;
  type: string;
  status: 'collected' | 'assigned' | 'pending';
  statusText: string;
  points: string;
  date: string;
  image: string;
}
