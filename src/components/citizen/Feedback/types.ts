export type FeedbackStatus = 'processing' | 'resolved' | 'pending';

export interface FeedbackItem {
  id: string;
  type: 'feedback' | 'complaint' | 'support';
  typeLabel: string;
  title: string;
  status: FeedbackStatus;
  statusLabel: string;
  date: string;
  response: string | null;
}

export interface FeedbackFormData {
  type: 'feedback' | 'complaint' | 'support';
  relatedReport: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}
