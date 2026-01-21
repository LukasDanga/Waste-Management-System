export type ReportStatus = 'urgent' | 'pending' | 'assigned' | 'in-progress' | 'completed' | 'rejected';
export type ReportPriority = 'high' | 'medium' | 'low' | undefined;

export interface Report {
  id: string;
  reportId: string;
  type: string;
  weight: string;
  location: string;
  status: ReportStatus;
  time: string;
  priority?: ReportPriority;
}
