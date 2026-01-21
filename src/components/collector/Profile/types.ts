export interface CollectorProfile {
  fullName: string;
  employeeId: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  dateJoined: string;
  position: string;
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber: string;
  emergencyContact: string;
  emergencyContactName: string;
}

export interface WorkArea {
  id: number;
  name: string;
  active: boolean;
}

export type Availability = Record<
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  boolean
>;

export interface PerformanceStat {
  label: string;
  value: string;
  helper: string;
  tone: 'emerald' | 'blue' | 'amber';
}

export interface Achievement {
  title: string;
  subtitle: string;
  colorClass: string;
}

export interface ProfileProps {
  // Placeholder for navigation hooks if needed later
}
