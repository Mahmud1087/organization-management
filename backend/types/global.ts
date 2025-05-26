import { ROLE } from '../constants';

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export interface CreateStaffRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  role: RoleType; // you can also use typeof ROLE[keyof typeof ROLE] if you want to tie it to your constants
  address: string;
  // password: string;
  // adminEmail: string;
  departmentName: string;
  // orgName: string;
}

export interface LoginStaffRequestBody {
  email: string;
  password: string;
}

export interface CreateLeaveRequestBody {
  reason: string;
  startDate: string;
  endDate: string;
}
