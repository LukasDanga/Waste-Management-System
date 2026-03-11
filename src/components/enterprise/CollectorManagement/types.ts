export interface UserInformation {
  userID: string;
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  isActive: boolean;
  createdBy: string;
}

export interface EnterpriseMember {
  memberID: string;
  userID: string;
  assignedAt: string;
  unassignedAt: string;
  enterpriseID: string;
  userInformation: UserInformation;
}
