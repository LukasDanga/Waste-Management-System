import type { CitizenReportItem } from '../../../services/citizenService';

export type TabKey = 'collectionReports' | 'complaintReports' | 'rewardHistories';

export interface CitizenProfileData {
  collectionReports: CitizenReportItem[];
  complaintReports: any[];
  rewardHistories: any[];
}
