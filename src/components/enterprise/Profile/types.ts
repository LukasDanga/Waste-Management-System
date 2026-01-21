export interface EnterpriseProfile {
  companyName: string;
  taxCode: string;
  businessLicense: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  representativeName: string;
  representativePhone: string;
  representativeEmail: string;
  representativePosition: string;
  foundedYear: string;
  employeeCount: string;
  operatingHours: string;
  description: string;
}

export interface LicenseItem {
  title: string;
  number: string;
  issuedDate: string;
  issuer: string;
  status: 'valid' | 'expired';
  note?: string;
}

export interface PerformanceStat {
  label: string;
  value: string;
  change: string;
  tone: 'emerald' | 'blue' | 'amber';
}

export interface Achievement {
  title: string;
  subtitle: string;
  iconColor: string;
}
