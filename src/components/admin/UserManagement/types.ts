export interface User {
  userID: string;
  fullName: string;
  email: string;
  gender: string;
  age: number;
  dob: string;
  isActive: boolean;
  createdBy?: string;
}
