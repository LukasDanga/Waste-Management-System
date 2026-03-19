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

const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';

const normalizeApiDateTime = (raw: string) => {
  const trimmed = raw.trim();
  const hasTimezone = /(?:Z|[+\-]\d{2}:\d{2})$/i.test(trimmed);
  const hasTimePartWithoutTimezone = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,7})?)?$/.test(trimmed);

  // Some API fields are UTC but do not include timezone suffix.
  if (!hasTimezone && hasTimePartWithoutTimezone) {
    return `${trimmed.replace(' ', 'T')}Z`;
  }

  return trimmed;
};

export const formatDateTime = (value?: string) => {
  if (!value) return 'Chưa xác định';
  const date = new Date(normalizeApiDateTime(value));
  if (Number.isNaN(date.getTime())) return 'Chưa xác định';
  const d = date.toLocaleDateString('vi-VN', { timeZone: VIETNAM_TIMEZONE });
  const t = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: VIETNAM_TIMEZONE,
  });
  return `${d} ${t}`;
};
