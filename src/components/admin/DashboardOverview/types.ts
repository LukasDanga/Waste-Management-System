import type { LucideIcon } from 'lucide-react';

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | string;
}

export interface TrendPoint {
  month: string;
  users: number;
}

export interface ActivityPoint {
  day: string;
  reports: number;
}

export interface RoleDistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface RecentActivityItem {
  type: string;
  icon: LucideIcon;
  text: string;
  time: string;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | string;
}
