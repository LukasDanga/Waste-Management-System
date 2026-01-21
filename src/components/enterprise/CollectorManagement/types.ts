export interface Collector {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  licensePlate: string;
  status: 'available' | 'busy';
  statusLabel: string;
  todayJobs: { completed: number; total: number };
  weekJobs: number;
  rating: number;
  totalReviews: number;
  avatar: string;
  joinDate: string;
}
