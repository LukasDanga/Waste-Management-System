export interface Permission {
  id: string;
  name: string;
  citizen: boolean;
  enterprise: boolean;
  collector: boolean;
  admin: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isCustom: boolean;
}
