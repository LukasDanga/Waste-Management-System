export interface ReportItem {
  id: string;
  location: string;
  type: 'organic' | 'recyclable' | 'hazardous' | 'general';
  typeLabel: string;
  status: 'pending' | 'accepted' | 'assigned' | 'collected';
  statusLabel: string;
  points: string;
  date: string;
  image: string;
}

export interface ReportFilters {
  status: string;
  type: string;
  time: string;
}
