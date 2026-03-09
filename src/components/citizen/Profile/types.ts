export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  avatar?: string;
}

export interface NotificationPreferences {
  reportUpdates: boolean;
  pointsRewards: boolean;
  systemNews: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}
