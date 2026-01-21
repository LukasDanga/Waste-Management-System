export type HistoryStatus = 'completed' | 'cancelled';

export interface HistoryItem {
  id: string;
  reportId: string;
  date: string;
  time: string;
  address: string;
  type: string;
  weight: string;
  duration: string;
  status: HistoryStatus;
  rating?: number;
}

export interface HistoryStats {
  total: number;
  completionRate: number;
  avgTime: number;
  avgRating: number;
}

export interface WorkHistoryProps {
  onNavigate: (page: string, taskId?: string) => void;
}
