export type StaffAuthDataReturnType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  departmentId: string;
  orgId: string;
  role: string;
  address: string;
  totalLeavesTaken: number;
  leaveBalance: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
};

export type OwnerAdminAuthDataReturnType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  orgId: string;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
};

export type GenericAuthDataReturnType =
  | StaffAuthDataReturnType
  | OwnerAdminAuthDataReturnType;

export type AuthDataType = {
  status: number;
  message: string;
  data: GenericAuthDataReturnType;
  token: string;
};
export type LoginRequestDataType = {
  email: string;
  password: string;
};
