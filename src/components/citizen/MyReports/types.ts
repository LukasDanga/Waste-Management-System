import type { CitizenReportItem } from '../../../services/citizenService';

export type TabKey = 'collectionReports' | 'complaintReports' | 'rewardHistories';

export interface CitizenArea {
  citizenAreaID: string;
  name: string;
  regionCode: string;
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  isActive: boolean;
}

export interface ComplaintReportItem {
  complaintReportID: string;
  title: string;
  description: string;
  imageName: string;
  status: number;
  reportAt: string;
  adminNote: string | null;
  collectionReportID: string;
  citizenProfileID: string;
  citizenArea: CitizenArea | null;
}

export interface RewardHistoryItem {
  rewardHistoryID: string;
  point: number;
  reason: string;
  occurredAt: string;
  citizenArea?: CitizenArea | null;
}

export interface CitizenProfileData {
  collectionReports: CitizenReportItem[];
  complaintReports: ComplaintReportItem[];
  rewardHistories: RewardHistoryItem[];
}

export interface PaginationState {
  collection: number;
  complaint: number;
  reward: number;
}

export const PAGE_SIZE = {
  collection: 10,
  complaint: 10,
  reward: 10,
};

export const formatDateTime = (value?: string) => {
  if (!value) return 'Chưa xác định';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Chưa xác định';
  const d = date.toLocaleDateString('vi-VN');
  const t = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${d} ${t}`;
};
