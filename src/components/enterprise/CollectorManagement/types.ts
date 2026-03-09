export interface Collector {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  licensePlate: string;
  status: 'available' | 'busy';
  statusLabel: string;
  todayJobs: { completed: number; total: number };
  weekJobs: number;
  avatar: string;
  joinDate: string;
}
